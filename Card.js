import React from 'react';
// Add import statements below
import { useSelector , useDispatch } from 'react-redux';
// import selectors;
import { selectVisibleIDs, selectMatchedIDs } from '../../boardSlice.js';
// import action creators; 
import { flipCard, resetCards } from '../../boardSlice.js';


let cardLogo = "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";

export const Card = ({ id, contents }) => {
  // Add selected data and dispatch variables below
  const visibleIDs = useSelector(selectVisibleIDs);
  const matchedIDs = useSelector(selectMatchedIDs);
  const dispatch = useDispatch();
  // flip card action
  const flipHandler = (id) => {
    // Add action dispatch below
    dispatch(flipCard(id));
  };

  // part 22.1 new feature - Reset the unmatched cards by clicking any card
  const resetCardsClickHandler = (id) => {
    // dispatch resetCards action to store. 
    dispatch(resetCards(id));
  }

  let cardStyle = 'resting'
  let click = () => flipHandler(id);
  
  // default text of each card is an image. rather than the card.contents.
  // cardText is returned by Card.
  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="Card option" />
  );
  
  /* description of Card's dynamic behaviour 
  When you match a pair of cards, the cards keep showing their text and stop dispatching actions 
  (first if statement) and the text will turn green (second if statement).
  */

  // 1st if statement
  // implement card id array membership check
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    // 1st condition: if id is in list of visible ids, display card.contents in cardText.
    // 2nd condition: if id is in matchedIDs array, also dispay card content.
    cardText = contents;
    click = () => {}; // set click function to return nothing instead of flipHandler(id); no flip handler, no actions dispatched. - clicking wil do nothing!
  }

  // 2nd if statement
  // implement card id array membership check
  // check if id is in array of ids of cards that match. 
  // Using the matchedIDs data, you can now reveal the matched cards by changing their cardStyle to 'matched'
  if (matchedIDs.includes(id)) {
    cardStyle = 'matched';
  }

  // 3rd if statement
  // implement number of flipped cards check
  if (visibleIDs.length===2) {
    click = () => {
      // new feature, 22.1 if there are two visible cards and neither match, clicking on any card dispatches resetCards action to store.
      resetCardsClickHandler(id);
    }; 
  }

  /* 22.2 new Feature - In index.css there is a ‘no-match’ selector which makes text red and can be applied to the card style when two visible cards are not matching. 
  The challenge here is to apply the style to the text of cards that are flipped over and not matched. */

  // to target flipped over cards, visibleID=true, visibleIDs.length===2 (for two cards). to target cards that don't match. matchedIDs cannot include id.
  if(visibleIDs.length===2 && !matchedIDs.includes(id)){
    // if two cards are flipped up, visible and yet card id isn't in matchedIDs list, set cardStyle to change className and allow css to target element with selector.
    cardStyle = 'no-match'
  }

  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};