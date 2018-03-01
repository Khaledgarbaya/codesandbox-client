// @flow

import GatsbyIcon from 'common/components/logos/Gatsby';
import Template from './template';
import { decorateSelector } from '../theme';

export default new Template(
  'gatsby-cli',
  'Gatsbyjs',
  'https://github.com/gatsby/gatsbyjs',
  'gatsby',
  GatsbyIcon,
  decorateSelector(() => '#AD78DC'),
  {
    showOnHomePage: true,
  }
);
