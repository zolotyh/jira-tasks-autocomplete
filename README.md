# jira-autocomplete-server

jira-tasks-autocomplete - language server for autocompletion by JIRA tasks;

# How to install

```
sh
npm install -g jira-autocomplete-server
```

# Settings for coc.nvim 

```
"jira": {
  "command": "jira-autocomplete-server",
    "args": ["--stdio"],
    "filetypes": ["gitcommit"],
},

```


