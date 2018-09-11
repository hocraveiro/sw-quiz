import React from 'react';
import SwButton from '../button';
import style from './item.scss';


const ListItem = ({person, onShowTip, onHit, id}) => {
  function onChange(evt){
    if(evt.target.value.toLowerCase() === person.name.toLowerCase()){
      onHit(person)
    }
  }
  return (
    <div className={style.listitem}>
      <img src={require(`../../images/${person.id}.jpg`)} alt="Start Wars Person"/>
      {
        person.hit ? 
        <p className={style.success}>Well done</p> :
        <div className={style.controls}>
          <input 
            type="text" 
            placeholder="Type name ex: 'Darth Vader'"
            id={`person-${id}`}
            className={`${style.name} person`} 
            onChange={onChange}
            value={person.nameTyped}/>
          <SwButton className={style.btntip} alt="Show Tip" onClick={() => onShowTip(person)}>?</SwButton>
        </div>
        }
      { person.showTip ? 
        (
          <div className={style.tips}>
            <p><span>Specie:</span> {person.species.join(',')}</p>
            <p><span>Height:</span> {person.height}</p>
            <p><span>Hair:</span> {person.hair_color}</p>
            <p><span>Planet:</span> {person.homeworld}</p>
            <p><span>Movies:</span> {person.films.join(', ')}</p>
            {person.vehicles.length > 0 ? <p><span>Vehicles:</span> {person.vehicles.join(', ')}</p>  : null }
          </div>
        ) : null
      }
    </div>
  )
}

export default ListItem;