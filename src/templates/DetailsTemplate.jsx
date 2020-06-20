import React from 'react';
import { Link } from 'react-router';

const DetailsTemplate = () => (
  <div>
    <h1>Note</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur cumque
      cupiditate dolorem ex neque nesciunt nulla quas quos ratione! Ad aliquid aspernatur ducimus ea
      esse hic illo illum, inventore laboriosam laborum mollitia optio porro quam, qui quia quidem
      repellat repellendus reprehenderit tempora temporibus totam.
    </p>
    <Link to="/">go back</Link>
  </div>
);

export default DetailsTemplate;
