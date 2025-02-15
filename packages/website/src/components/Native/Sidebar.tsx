import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Sidebar from '../Sidebar';

const query = graphql`
  {
    allFile(sort: { fields: name }, filter: { extension: { eq: "mdx" }, fields: { type: { eq: "native" } } }) {
      edges {
        node {
          extension
          name
          relativeDirectory
          childMdx {
            frontmatter {
              title
              path
              wip
            }
          }
        }
      }
    }
  }
`;

const orders = [
  {
    '': [
      'getting-started',
      'platform-compatibility',
      'theming',
      'styling-components',
      'palette',
      'breakpoints',
      'fonts',
      'spacing',
      'composition',
      'variants',
      'color-modes',
    ],
  },
  {
    'the-box-primitive': [
      'box',
      'flex',
      'style-props',
      'box-scroll',
      'box-safe',
      'box-touchable',
      'box-touchablewithoutfeedback',
      'box-keyboardavoiding',
    ],
  },
  { hooks: [] },
  { layout: [] },
  { typography: [] },
  { components: [] },
  { form: [] },
  { utilities: [] },
];

export default function DocsSidebar(props: any) {
  const { path } = props;
  const { allFile } = useStaticQuery(query);
  const items = allFile.edges.reduce((currentItems, node) => {
    const item = node.node;
    let relativeDirectory = item.relativeDirectory.replace('native/', '').replace('native', '') || '';
    return { ...currentItems, [relativeDirectory]: [...(currentItems[relativeDirectory] || []), item] };
  }, {});
  return <Sidebar orders={orders} items={items} path={path} />;
}
