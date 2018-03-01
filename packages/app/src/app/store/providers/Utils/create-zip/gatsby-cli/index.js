import type { Sandbox, Module, Directory } from 'common/types';

import files from 'buffer-loader!./files.zip'; // eslint-disable-line import/no-webpack-loader-syntax

import { createPackageJSON, createDirectoryWithFiles, createFile } from '../';

export default function createZip(
  zip,
  sandbox: Sandbox,
  modules: Array<Module>,
  directories: Array<Directory>
) {
  return zip.loadAsync(files).then(async srcFolder => {
    const src = srcFolder.folder('src');

    await Promise.all(
      modules
        .filter(x => x.directoryShortid == null)
        .filter(x =>
          [
            'gatsby-node.js',
            'gatsby-browser.js',
            'gatsby-config.js',
            'gatsby-ssr.js',
          ].includes(x.title)
        )
        .map(x => createFile(x, srcFolder))
    );

    await Promise.all(
      modules
        .filter(x => x.directoryShortid == null)
        .filter(
          x =>
            ![
              'gatsby-node.js',
              'gatsby-browser.js',
              'gatsby-config.js',
              'gatsby-ssr.js',
            ].includes(x.title)
        )
        .map(x => createFile(x, src))
    );

    await Promise.all(
      directories
        .filter(x => x.directoryShortid == null)
        .map(x => createDirectoryWithFiles(modules, directories, x, src))
    );
    zip.file(
      'package.json',
      createPackageJSON(
        sandbox,
        {
          gatsby: '^1.9.218',
          'gatsby-link': '^1.6.37',
          'gatsby-plugin-react-helmet': '^2.0.5',
          'react-helmet': '^5.2.0',
        },
        {
          prettier: '^1.11.0',
        },
        {
          build: 'gatsby build',
          develop: 'gatsby develop',
          format:
            'prettier --trailing-comma es5 --no-semi --single-quote --write "src/**/*.js"',
          test: 'echo "Error: no test specified" && exit 1',
        }
      )
    );
  });
}
