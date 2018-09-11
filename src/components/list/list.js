import React from 'react';
import ListItem from './item';
import style from './list.scss';
const List = ({people, onShowTip, onHit}) => {
  const items = people.map((person, index) => {
    return (
      <ListItem 
        key={index} 
        person={person} 
        onHit={onHit}
        id={index}
        onShowTip={onShowTip} 
      />
    )
  })

  return (
    <div className={style.list}>
      {items}      
    </div>
  )
}

export default List;