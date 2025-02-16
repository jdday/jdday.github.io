import { EditorState } from 'prosemirror-state';
import { schema } from 'prosemirror-schema-basic';
import { NodeViewComponentProps, ProseMirror, ProseMirrorDoc, reactKeys } from '@handlewithcare/react-prosemirror';
import { forwardRef } from 'react';
import './app.css';

const ParagraphNode = forwardRef<HTMLParagraphElement, NodeViewComponentProps>(
  ({ children, nodeProps, ...props }, ref) => {
    console.log(nodeProps, props);
    return (
      <p
        ref={ref}
        {...props}>
        {children}
      </p>
    );
  }
);

function ProseMirrorWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto border rounded-md">
      <header className="border-b h-10 w-full"></header>
      <div className="p-3">{children}</div>
    </div>
  );
}

function App() {
  const [state, setState] = React.useState(EditorState.create({ schema, plugins: [reactKeys()] }));
  
  console.log(state)
  
  return (
    <div className="p-10">
      <ProseMirror
      
        className=""
        defaultState={state}
        
        nodeViews={{ paragraph: ParagraphNode }}>
        <ProseMirrorWrapper>
          <ProseMirrorDoc  />
        </ProseMirrorWrapper>
      </ProseMirror>
    </div>
  );
}

export { App };
