/**
 * Created by Rick on 2022-06-03.
 */
'use strict';
const move_target = {
  'node': null,
  'start_move': false,
  'click_x': null,
  'click_y': null,
  'move_x': 0,
  'move_y': 0,
}

function mouse_down(e){
  move_target.click_x = e.clientX;
  move_target.click_y = e.clientY;
  move_target.node = e.target.parentNode;
  if(move_target.node.last_move_x === undefined){
    move_target.node.last_move_x = 0;
    move_target.node.last_move_y = 0;
  }
  move_target.start_move = true;
}

function mouse_move(e){
  if(move_target.start_move){
    move_target.move_x = move_target.node.last_move_x + e.clientX - move_target.click_x;
    move_target.move_y = move_target.node.last_move_y + e.clientY - move_target.click_y;
    move_target.node.setAttribute('transform', `translate(${move_target.move_x},${move_target.move_y})`)
  }
}

function mouse_end(e){
  move_target.start_move = false;
  if(move_target.node !== null){
    move_target.node.last_move_x = move_target.move_x;
    move_target.node.last_move_y = move_target.move_y;
  }
}

export {
  mouse_down,
  mouse_move,
  mouse_end
}