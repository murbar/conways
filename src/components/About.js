import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

const Blockquote = styled.blockquote`
  font-size: 0.9em;
  border-left: 0.1em solid grey;
  margin: 0 2rem;
  padding: 0 2rem;
`;

export default function About() {
  return (
    <Styles>
      <h2>What is it?</h2>
      <p>
        Invented by Cambridge mathematician John Conway, the Game of Life is a game with no players.
        More simulation than game, cells on a grid live and die according to a simple set of rules.
        A cell has eight neighboring cells and it's next state is determined by the number of those
        cells that are alive. Upon each iteration of the grid:
      </p>
      <ul>
        <li>A living cell with less than 2 neighbors will die from loneliness</li>
        <li>A living cell with more than 3 neighbors will die from overcrowding</li>
        <li>A living cell with 2 or 3 neighbors is contented and lives on</li>
        <li>An empty cell with exactly 3 neighbors will spontaneously come to life</li>
      </ul>
      <p>s</p>
      <p>
        From <a href="http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life">LifeWiki</a>:
      </p>
      <Blockquote>
        Conway was interested in a problem presented in the 1940s by renowned mathematician John von
        Neumann, who tried to find a hypothetical machine that could build copies of itself ... The
        Game of Life emerged as Conway's successful attempt to simplify von Neumann's ideas. ...
        From a theoretical point of view, it is interesting because it has the power of a universal
        Turing machine: that is, anything that can be computed algorithmically can be computed
        within Conway's Game of Life.
      </Blockquote>
      <h2>Cellular Automata</h2>
      <p>
        What is is, applications in computer science, turing completeness... Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. At, eveniet eius, laudantium expedita est consequatur
        voluptatem rem natus accusamus quas ab, eligendi quo. Aspernatur aliquam ea quo, debitis
        dolor sed?
      </p>
      <h2>Technical Considerations</h2>

      <p>
        Polya process, React, double-buffers, canvas, possible improvments... Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Ab sapiente excepturi adipisci fuga animi cumque
        veritatis error rerum quis, laboriosam dolore delectus porro dolorem rem enim obcaecati
        ipsum distinctio aspernatur.
      </p>
    </Styles>
  );
}
