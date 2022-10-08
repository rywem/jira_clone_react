# jira_clone_react
A repository for a JIRA clone. 


## Client Packages
- Mobx
- Bootstrap `npm install react-bootstrap bootstrap`
- react-router-dom `npm i -D react-router-dom`
- axios `npm install axios`
- semantic-ui-react `npm install semantic-ui-react`* //there's an issue with semantic ui css. there's a work around, see below


### Workaround, semantic ui react
* Work around React 18 issue with css (Semantic ui react): use cdn (put in public\index.html inside body tag at top):
``` 
<link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
  />
```



### Another possible issue:
- `npm install @types/react@^17`


