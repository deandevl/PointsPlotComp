library(httpuv)
library(data.table)
library(here)
library(jsonlite)
library(RserverPkg)
library(RdelimitedPkg)

current_dir <- here()

index_path <- file.path(current_dir, "/demos/iris_server/html/prod")
assets_path <- file.path(current_dir, "/demos/iris_server/html/prod")
iris_data_path <- file.path(current_dir, "/demos/iris_server/data/iris.csv")

IrisTextReader <- RdelimitedPkg::DelimitedFile$new(
  file_path = iris_data_path
)

iris_dt <- IrisTextReader$read()
iris_variables_v <- IrisTextReader$names()[1:4]
static_paths <- list("/assets" = assets_path)

# Route functions
get_iris_summary <- function(req_info){
  return(jsonlite::toJSON(
    IrisTextReader$numeric_summary(iris_variables_v)
  ))
}
get_iris_data <- function(req_info){
  query_lst <- req_info$query_list
  variable_1 <- query_lst[["variable_1"]]
  variable_2 <- query_lst[["variable_2"]]

  #debug:
  #variable_1 <- "sepal_length"
  #variable_2 <- "petal_length"

  data_lst <- list()
  data_lst[["x"]] <- iris_dt[[variable_1]]
  data_lst[["y"]] <- iris_dt[[variable_2]]
  data_lst[["grp"]] <- iris_dt[["class"]]

  return(jsonlite::toJSON(
    data_lst
  ))
}
get_iris_lm <- function(req_info){
  query_lst <- req_info$query_list
  variable_1 <- query_lst[["variable_1"]]
  variable_2 <- query_lst[["variable_2"]]

  #debug:
  #variable_1 <- "sepal_length"
  #variable_2 <- "petal_length"

  # perform a linear fit
  a_formula <- as.formula(paste0(variable_2, "~", variable_1))
  iris_lm <- stats::lm(formula = a_formula, data = iris_dt)
  iris_cof <- coefficients(iris_lm)

  lm_lst <- list()
  lm_lst[["intercept"]] <- iris_cof[["(Intercept)"]]
  lm_lst[["predictor"]] <- iris_cof[[variable_1]]
  lm_lst[["fit"]] <- iris_lm[["fitted.values"]]

  return(jsonlite::toJSON(
    lm_lst
  ))
}

# Define routes
summary_route <- RserverPkg::Route$new(
  path = "/summary",
  handler = get_iris_summary,
  content_type = "text/plain"
)

iris_data_route <- RserverPkg::Route$new(
  path = "/iris_data",
  handler = get_iris_data,
  content_type = "text/plain"
)

iris_lm_route <- RserverPkg::Route$new(
  path = "/iris_lm",
  handler = get_iris_lm,
  content_type = "text/plain"
)

# Define server
iris_server <- RserverPkg::Server$new(
  index_path = index_path,
  routes = c(summary_route, iris_data_route, iris_lm_route),
  static_paths = static_paths
)

iris_server$start()

iris_server$list_servers()

iris_server$stop()

