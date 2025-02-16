import { ProseMirror, ProseMirrorDoc, reactKeys } from '@handlewithcare/react-prosemirror';
import { schema } from 'prosemirror-schema-basic';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import React from 'react';
import './app.css';

function ProseMirrorWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto border rounded-md">
      <header className="border-b h-10 w-full"></header>
      <div className="p-3">{children}</div>
    </div>
  );
}



const trackTransactionPlugin = new Plugin({
  state: {
    init: (config, instance) => {
      // console.log(config, instance);
      console.log(JSON.stringify(instance.doc))
      return { transactions: [] as Transaction[] };
    },
    apply: (transaction, trackedChanges, oldState, newState) => {
      // called when a new local transaction is applied
      // likely this is where we need to apply some reconciliation logic with remote state
      console.log('apply', transaction);

      console.log(newState.doc.toJSON())

      
      return { transactions: [...trackedChanges.transactions, transaction] };
    },
  },
});

function App() {
  const [state, setState] = React.useState(EditorState.create({ schema, plugins: [reactKeys(), trackTransactionPlugin] }));

  

  return (
    <div className="p-10">
      <ProseMirror defaultState={state}>
        <ProseMirrorWrapper>
          <ProseMirrorDoc />
        </ProseMirrorWrapper>
      </ProseMirror>
    </div>
  );
}

export { App };
