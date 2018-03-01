// @flow
import angular from './angular';
import vue from './vue';
import react from './react';
import reactTs from './react-ts';
import preact from './preact';
import svelte from './svelte';
import parcel from './parcel';
import gatsby from './gatsby';

export { angular, vue, react, reactTs, preact, svelte, parcel, gatsby };

export default function getDefinition(
  theme:
    | 'create-react-app'
    | 'vue-cli'
    | 'preact-cli'
    | 'svelte'
    | 'create-react-app-typescript'
    | 'angular-cli'
    | 'parcel'
    | 'gatsby-cli'
) {
  switch (theme) {
    case react.name:
      return react;
    case vue.name:
      return vue;
    case preact.name:
      return preact;
    case reactTs.name:
      return reactTs;
    case svelte.name:
      return svelte;
    case angular.name:
      return angular;
    case parcel.name:
      return parcel;
    case gatsby.name:
      return gatsby;
    default:
      return react;
  }
}
