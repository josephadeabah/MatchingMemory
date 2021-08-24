import React from 'react';
import { CardRow } from './cardRow/CardRow.js';
// Add import statements below
import { useSelector } from 'react-redux';
import { selectBoard } from './boardSlice'

export const Board = () => {
  // Add selected data variable and implement below
  const currentBoard = useSelector(selectBoard);
  /* The logic in the Board component creates a grid of cards by rendering a calculated number of CardRow components. 
  To finish the implementation you will use the data in currentBoard to help calculate the number of CardRow components 
  and then create an array of card objects for each row. */
  /* 
  at least describe, if not show me what I'm supposed to implement CodeCademy!? 
  i don't understand what i'm supposed to do. 
  I feel like I'm just follwing the tutorial, copying code or cargo culting. i can't predict what i'm meant to do next 
  cos the project is flipping complicated and i don't even know what it's supposed to look like once finished. 
  I can't read the code because the code is purposefull incomplete!
  the context around the exercise is harder than the exercise itself! 
  */

  const numberOfCards = currentBoard.length;
  const columns = 3;
  const rows = Math.floor(numberOfCards / columns);

  const getRowCards = (row) => {
    // select cards in order from currentBoard to populate rows. content.push(<CardRow key={row} cards={rowCards} />
    // where each row has three cards - from the columns=3;
    const rowCards = [];
    for (let j = 0; j < columns; j++) {
      const cardIndex = row * columns + j; // row 0: cardIndex=[0,1,2],  row 1: cardIndex=[3,4,5],  cardIndex=row 2:[6,7,8] 
      // Implement selected data below
      rowCards.push(currentBoard[cardIndex]);
    }
    return rowCards;
  };

  let content = [];
  for (let row = 0; row < rows; row++) {
    const rowCards = getRowCards(row);
    content.push(
      <CardRow 
        key={row} 
        cards={rowCards} 
      />
    );
  }
  return <div className="cards-container">{content}</div>;
};