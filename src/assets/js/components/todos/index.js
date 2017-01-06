import React, { PureComponent } from 'react';
import Editor from '../common/Editor';

class Todos extends PureComponent {
    
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }
    
    render() {
        return(
            <section className="todos">
                <section className="editor-area">
                    <Editor
                        placeholder={'Enter TODO title'}
                        add={this.add}
                        clearError={this.clearError}
                        isError={this.state.isError}
                        errorMessage={this.state.errorMessage}
                    />
                </section>
            </section>
        )
    }
}

export default Todos