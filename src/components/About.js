import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StepIcon } from '../icons/forward.svg';
import { ReactComponent as RandomizeIcon } from '../icons/shuffle.svg';
import { ReactComponent as ResetIcon } from '../icons/grid.svg';
import { media } from '../styles/helpers';

const Styles = styled.div`
  .controls {
    svg {
      width: 1em;
      transform: translateY(0.1em);
    }
    ${'' /* line-height: 1.8; */}
  }
`;

const Instructions = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.8em;
  margin-top: 1rem;
  h2 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      line-height: 2;
    }
  }
  ${media.phone`
    padding: 1.5rem 2.5rem;
    font-size: 0.9em;
  `}
`;

const HotKey = styled.kbd`
  background: ${p => p.theme.colors.secondary};
  padding: 0.25em 0.5em;
  border-radius: 0.5rem;
  font-size: 0.8em;
  font-family: inherit;
  text-transform: uppercase;
  box-shadow: 1px 1px black, 1px 1px grey inset;
  margin-left: 0.5rem;
`;

export default function About() {
  return (
    <Styles>
      <Instructions>
        <h2>Get Started</h2>
        <ul className="controls">
          <li>
            <PlayIcon /> <strong>Play</strong> / <PauseIcon /> <strong>Pause</strong> the simulation{' '}
            <HotKey>P</HotKey>
          </li>
          <li>
            <StepIcon /> <strong>Step</strong> forward one iteration <HotKey>S</HotKey>
          </li>
          <li>
            <RandomizeIcon /> <strong>Randomize</strong> the grid <HotKey>R</HotKey>
          </li>
          <li>
            <ResetIcon /> <strong>Clear</strong> the grid <HotKey>C</HotKey>
          </li>
          <li>
            Control the <strong>rate of evolution</strong> with the speed toggle and change a cell's
            state with a <strong>click, or drag across the grid</strong> to easily edit multiple
            cells
          </li>
        </ul>
      </Instructions>
      <h2>What is it?</h2>
      <p>
        Invented by Cambridge mathematician John Conway in 1970, the Game of Life is a "game" with
        no players. More simulation than game, cells on a grid live and die according to a simple
        set of rules. A cell's fate is determined by the number of neighboring cells that are alive.
        Upon each iteration of the grid:
      </p>
      <ul>
        <li>A living cell with less than 2 neighbors will die from loneliness</li>
        <li>A living cell with more than 3 neighbors will die from overcrowding</li>
        <li>A living cell with 2 or 3 neighbors is contented and lives on</li>
        <li>An empty cell with exactly 3 neighbors will spring to life</li>
      </ul>
      <p>
        Conway's game was inspired by work done in the 1940s by John von Neumann who was working on
        an idea for a hypothetical self-replicating machine. The <em>Game of Life</em> is a classic{' '}
        <a href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automaton</a> and the
        product of Conway's efforts to simplify von Neumann's ideas.
      </p>
      <p>
        The work is of interest to computer scientists because it's possible to build the elementary
        parts of a computer, including memory and{' '}
        <a href="https://sucs.org/~pwb/report/lifecomp.html">logic gates</a>, inside the simulation.
        This makes <em>Life</em> a{' '}
        <a href="https://en.wikipedia.org/wiki/Universal_Turing_machine">
          universal Turing machine
        </a>{' '}
        &mdash; theoretically capable of computing anything that can be computed algorithmically,
        given a large enough grid and sufficient time.
      </p>
      <p>
        The game's concepts of emergent complexity and self-organization are influential in a wide
        range of fields including physics, biology, math, economics, philosophy and art.{' '}
      </p>
      <h2>Big Ideas</h2>
      <p>
        I’d encountered Conway’s game years ago after I read{' '}
        <a href="https://www.amazon.com/Emergence-Connected-Brains-Cities-Software/dp/0684868768">
          <em>Emergence</em>
        </a>{' '}
        by Steven Johnson. The ideas in that book led me to Wolfram’s{' '}
        <a href="https://www.amazon.com/gp/product/1579550088">
          <em>A New Kind of Science</em>
        </a>
        , which I found completely impenetrable, but further led me to the field of cellular
        automata, where I found <em>The Game of Life</em>.
      </p>
      <p>
        At the time I was fascinated with the idea of enormously complex systems emerging from a
        simple set of rules and constraints. Ruminating on these these concepts, I wondered: could
        the entire universe, with its extraordinary complexity, have evolved from just a relatively
        few laws of physics? Do we exist in a giant simulation, albeit one that is the size of the
        universe and has been running for 14 billion years?
      </p>
      <p>
        What distinguishes this simulation from “reality”, or is there any meaningful difference at
        all? And what about free will; if every moment in time is determined by the state of the
        universe in the moment before it and will evolve according to a set of fixed rules, is the
        future not already set?
      </p>
      <p>
        These ideas still interest me today so I was excited to build my own simple version Conway’s
        game.
      </p>
      <h2>My Process</h2>
      <p>
        Polya's famous method for solving mathematical problems is widely applicable to other fields
        of study, especially computer science and algorithm design. He outlines four steps to follow
        when approaching a problem:
      </p>
      <ul>
        <li>take time to fully understand the problem,</li>
        <li>devise a plan,</li>
        <li>implement the plan,</li>
        <li>reflect upon, verify, and possibly improve the solution.</li>
      </ul>

      <h3>Understanding the problem</h3>

      <p>
        First, I knew that I wanted to build this project for the web so that it was accessible to
        the widest possible audience. If I’d built it with Python for example, the user would have
        to download some code and figure out how to run it locally. My library of choice is React
        when building UIs for the web.
      </p>

      <p>
        After some quick research on the web and taking a look at other examples of the game, I knew
        we’d need components for a grid, cells on the grid, and controls for the simulation. We’d
        also have to maintain the state of the grid and have functions that could manipulate the
        state as well as transform the state between iterations.
      </p>

      <p>
        Would using plain React components to represent cells be sufficiently performant? What if
        our grid has thousands of cells? I decided to render each cell as a styled <code>div</code>{' '}
        and I’d explore other possibilities if and when it became a performance bottleneck. Get it
        working first, optimize later as needed.
      </p>

      <h3>Planning</h3>

      <p>
        A 2d array of 1s and 0s (alive or empty) seemed like a good choice for cells on the grid.
        During each iteration we loop through all the cells in the grid, count the immediate
        neighbors of each cell, and determine the cell’s next state based on the rules of the game.
      </p>

      <p>
        Evolving the grid from one state to the next is a pure function—we return a new array based
        on the previous grid’s state instead of mutating the array in place. This is important
        because if we change the state of the grid while we're iterating over it we won’t get the
        results we’re after. We’re in luck since in React state is immutable, this concept of a
        “double buffer” is built in. We grab the application state, build a new state array based on
        it, and set our application state to the new array.
      </p>

      <p>
        Evolving the grid from one state to the next would be implemented using{' '}
        <code>setInterval</code>, probably without too much effort in React with hooks.
      </p>

      <p>
        We’d need a way to toggle cells on the grid as well, in a way that was comfortable and
        obvious for the user. And there should be a display for the current generation and
        population count.
      </p>
      <h3>Implementation</h3>

      <p>
        Within a few hours, I had the app working with about 80% of features implemented. It turns
        out that React is really good at rendering a lot of components while making only the minimum
        required updates to the DOM. Especially after build optimizations, using a <code>div</code>{' '}
        for each cell performed perfectly fine even with 2500+ cells.
      </p>

      <p>
        Using React hooks, I was able to painlessly incorporate <code>setInterval</code> in the app
        and set the interval to a value saved in the game’s configuration state.
      </p>

      <p>
        It took the better part of a day to work out the logic and combination of event listeners to
        get the cell toggle functionality to work the way I envisioned. I wanted the user to not
        only be able to click and toggle a cell's state, but also able to click and drag to “draw”
        cells on the grid in a natural way. After some trial and error, I was able to achieve the
        desired outcome.
      </p>

      <p>
        I spent some time creating the speed toggle component from scratch. I could have searched
        for a 3rd party library to accomplish the same functionality, but I find that it takes time
        to locate the right solution and even when found, it’s often more complex than necessary. I
        value simplicity in the code that I write, or at least only as much complexity as necessary
        to solve the problem and no more. I ended up with exactly what I wanted in surprisingly
        little time, further testament to the power of React.
      </p>

      <p>
        Ensuring that the game was mobile-first and also took full advantage of a wide-screen
        desktop display was not as trivial as I expected, though it was time well spent. I had to
        brush up on some CSS techniques to maintain the square aspect ratio of the grid at all
        times.
      </p>

      <p>
        To jazz it up a little, I added keyboard shortcuts for the controls and spent some extra
        time getting the styling just right. We know that the user’s first impression is important;
        if we don’t get the UI right, no one will want to use it, no matter how elegant or clever
        the code under the hood.
      </p>

      <h3>Retrospective</h3>

      <p>
        Looking back, I would like to explore re-writing the grid and cells with the{' '}
        <code>canvas</code> API. While the app works just fine now, the performance would be
        improved significantly and we would be able to play with a much larger grid. I could explore
        a full-screen mode with a pannable grid as well.
      </p>

      <p>
        I enjoyed building this project, learned a few things along the way, and hope you have some
        fun tinkering in the Game of Life!
      </p>
    </Styles>
  );
}
