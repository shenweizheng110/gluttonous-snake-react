import * as React from 'react';
import * as ReactDOM from 'react-dom';

const mountNode: Element = document.getElementById('root');

const App = () => {
    return (
        <>
            <span>asdasd</span>
        </>
    );
};

let a: [number, string] = [1, '1'];

enum Color {Red, Green, Blue}

ReactDOM.render(<App />, mountNode);
