### TODOs

- [] Update README.md with demo screenshots
- [] Change `dependencies` to `peerDependencies` in package.json to make the plugin requirement as broad as possible
- [] Resolve the corejs errors. Sample:

```bash
Bundling react-interactive-comments...
'core-js/modules/es.array.iterator.js' is imported by react-interactive-comments/src/lib/react-interactive-comments.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/web.dom-collections.iterator.js' is imported by react-interactive-comments/src/lib/react-interactive-comments.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.object.assign.js' is imported by react-interactive-comments/src/lib/react-interactive-comments.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.regexp.to-string.js' is imported by react-interactive-comments/src/lib/react-interactive-comments.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.array.iterator.js' is imported by react-interactive-comments/src/components/comment/comment_controls.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.object.assign.js' is imported by react-interactive-comments/src/components/textarea/textarea.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/web.dom-collections.iterator.js' is imported by react-interactive-comments/src/components/comment/comment_controls.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/web.dom-collections.iterator.js' is imported by react-interactive-comments/src/components/comment/comment.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.object.assign.js' is imported by react-interactive-comments/src/components/comment/comment.tsx, but could not be resolved – treating it as an external dependency
'core-js/modules/es.array.iterator.js' is imported by react-interactive-comments/src/components/comment/comment.tsx, but could not be resolved – treating it as an external dependency
```
