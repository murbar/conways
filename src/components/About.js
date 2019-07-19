import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function About() {
  return (
    <Styles>
      <h2>What is it?</h2>
      <p>
        Invented by Cambridge mathematician John Conway in 1970, the Game of Life is a "game" with
        no players. More simulation than game, cells on a grid live and die according to a simple
        set of rules. A cell has eight neighboring cells and it's next state is determined by the
        number of those cells that are alive. Upon each iteration of the grid:
      </p>
      <ul>
        <li>A living cell with less than 2 neighbors will die from loneliness</li>
        <li>A living cell with more than 3 neighbors will die from overcrowding</li>
        <li>A living cell with 2 or 3 neighbors is contented and lives on</li>
        <li>An empty cell with exactly 3 neighbors will spontaneously come to life</li>
      </ul>
      <p>
        Conway's game was inspired by work done in the 1940s by John von Neumann who was searching
        for a hypothetical machine that could self-replicate. The <em>Game of Life</em> was the
        product of Conway's efforts to simplify von Neumann's ideas.
      </p>
      <p>
        The work is of interest to computer scientists because it is possible to build the
        elementary parts of a computer, like memory and logic gates, inside the simulation. This
        makes <em>Life</em> a universal Turing machine &mdash; theoretically as powerful as any
        computer with unlimited time and memory and capable of computing anything that can be
        computed algorithmically.
      </p>
      <p>
        The game's concepts of emergent complexity and self-organization are influential in a wide
        range of fields including physics, biology, math, economics, philosophy and art.{' '}
      </p>

      {/* <h2>Technical Considerations</h2>

      <p>
        Polya process, React, double-buffers, canvas, possible improvments... Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Ab sapiente excepturi adipisci fuga animi cumque
        veritatis error rerum quis, laboriosam dolore delectus porro dolorem rem enim obcaecati
        ipsum distinctio aspernatur.
      </p> */}
    </Styles>
  );
}
