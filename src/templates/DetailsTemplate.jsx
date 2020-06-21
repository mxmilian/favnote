import React from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';
import { Link } from 'react-router-dom';

const DetailsTemplate = () => (
  <SidebarTemplate pageType="notes">
    <h1>Note</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur cumque
      cupiditate dolorem ex neque nesciunt nulla quas quos ratione! Ad aliquid aspernatur ducimus ea
      esse hic illo illum, inventore laboriosam laborum mollitia optio porro quam, qui quia quidem
      repellat repellendus reprehenderit tempora temporibus totam.
    </p>
    <Link to="/">go back</Link>
  </SidebarTemplate>
);

export default DetailsTemplate;
