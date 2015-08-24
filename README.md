# rethinking-flux
This is based on http://dialelo.github.io/application-architecture-with-react-rethinking-flux.html which is a proposal for porting the concepts in ClojureScript and Om to pure JavaScript. 

It does work, but its purpose is more of an architectural concept than a demo that wows you with its functionality. The broader theme is next generation JavaScript frameworks, using functional ideas from languages like Clojure. 

#Critiques of Flux
These are the critiques the author makes in the article (based on coming from a background of ClojureScript and Om):

* It complects state management and the bussiness logic for causing state changes.
* State is scattered through various stores which are apparently modular albeit they end up knowing about each other.
* The stores are coupled with the dispatching mechanism.


#Setting up
Ensure you're running node `0.10` using `nvm`.
```
nvm install 0.10
nvm use 0.10

npm rebuild
npm install
```

#Starting:
```
npm install --global gulp
npm install --save-dev gulp
npm install
gulp
```

#Finally
You should follow [Alejandro](https://twitter.com/dialelo) on Twitter - he's doing some amazing things with ClojureScript. 


