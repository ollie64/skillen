/** @jsx React.DOM */


/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {

'use strict';

    var WordRow = React.createClass({
        render: function() {
            return (
                <tr>
                    <td>
                        <form >
                        Show words:
                            <input name="filterForm" onChange={this.handleChange} ref="filterWordsAll" type="radio" value={this.props.wordsFilter == "all"} />
                            <label >All</label>
                            <input name="filterForm" onChange={this.handleChange} ref="filterWordsNew" type="radio" value={this.props.wordsFilter == "new"} />
                            <label >New</label>
                            <input name="filterForm" onChange={this.handleChange} ref="filterWordsStudy" type="radio" value={this.props.wordsFilter == "study"} />
                            <label >To study</label>
                            <input name="filterForm" onChange={this.handleChange} ref="filterWordsKnown" type="radio" value={this.props.wordsFilter == "known"} />
                            <label >Known</label>
                        </form>

                    </td>
                    <td>{this.props.title}
                    </td>
                    <td>-- {this.props.translate}
                    </td>
                </tr>
                //<li key={this.props.key}>{this.props.title}</li>
            );
        }
    });

    var TodoList = React.createClass({
        render: function() {
            //alert(JSON.stringify(this.props.items));
            var createItem = function(item, pos) {
                return <WordRow key={pos} title={item.name} translate={item.text} />;
            };

            return <table class="table">
                    {this.props.items.map(createItem)}
                </table>
        }
    });


    var OloloBar = React.createClass({
        handleChange: function() {
            if (this.refs.filterWordsAll.getDOMNode().checked)
                this.props.onUserInput("all");
            if (this.refs.filterWordsNew.getDOMNode().checked)
                this.props.onUserInput("new");
            if (this.refs.filterWordsStudy.getDOMNode().checked)
                this.props.onUserInput("study");
            if (this.refs.filterWordsKnown.getDOMNode().checked)
                this.props.onUserInput("known");
        },

        render: function() {
            return (
                <form >
                    Show words:
                    <input name="filterForm" onChange={this.handleChange} ref="filterWordsAll" type="radio" value={this.props.wordsFilter == "all"} />
                        <label >All</label>
                    <input name="filterForm" onChange={this.handleChange} ref="filterWordsNew" type="radio" value={this.props.wordsFilter == "new"} />
                        <label >New</label>
                    <input name="filterForm" onChange={this.handleChange} ref="filterWordsStudy" type="radio" value={this.props.wordsFilter == "study"} />
                        <label >To study</label>
                    <input name="filterForm" onChange={this.handleChange} ref="filterWordsKnown" type="radio" value={this.props.wordsFilter == "known"} />
                        <label >Known</label>
                    </form>
            );
        }
    });



    var WordsApp = React.createClass({

    //propTypes: {
    //    text: React.PropTypes.string
    //},

    getInitialState: function() {
        return {formText: '',
            inStockOnly: false};
    },

    //componentDidMount: function() {
    //    $.ajax({
    //        url: "/api/books",
    //        dataType: 'json',
    //        success: function(data) {
    //            console.log(data);
    //            this.setState({items: data});
    //        }.bind(this),
    //        error: function(xhr, status, err) {
    //            console.error(this.props.url, status, err.toString());
    //        }.bind(this)
    //    });
    //},

    onChange: function(e) {
        this.setState({formText: e.target.value});
    },

    handleSubmit: function(e) {
        //e.defaultPrevented();
        //this.props.model.addTodo(this.state.text);

//        var nextItems = this.state.items.concat([this.state.text]);
//        var nextText = '';
        //this.setState({items: this.props.model.todos, text: nextText});
    },

    handleClear: function(e) {
        this.props.model.clearAll();

        var nextText = '';
        this.setState({items: this.props.model.todos, text: nextText});
    },

    handleUserInput: function(formText, inStockOnly) {
        this.setState({
            filterText: formText,
            inStockOnly: inStockOnly
        });
    },

    handleUserFilter: function(wordsFilter) {
        this.setState({
            wordsFilter: wordsFilter
        });
    },

        render: function() {
        window.console.log(JSON.stringify(this.props.vocabulary));
        return (
            <div>
                <h3>Vocabulary</h3>

                <OloloBar
                    wordsFilter={this.state.wordsFilter}
                    onUserInput={this.handleUserFilter}
                />
                <p>
                    Selected: {this.state.wordsFilter}
                </p>
                <TodoList items={this.props.vocabulary} wordsFilter={this.state.wordsFilter} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.formText} />
                    <button>{'Add #' + (this.props.vocabulary.length + 1)}</button>
                </form>
            <button type="button" className="btn btn-success" onClick={this.handleClear}>Success</button>
            </div>
            );
    }
});


//var model = new app.TodoModel('react-words');

    var PRODUCTS = [
        {category: 'new',   name: 'Football',   translate: "fdsfd saf sd"},
        {category: 'study', name: 'Baseball',   translate: "ddddddddaaqqqq"},
        {category: 'known', name: 'Basketball', translate: "dsadasds"},
        {category: 'new',   name: 'iPod Touch', translate: "dsadas daaas"},
        {category: 'new',   name: 'iPhone 5',   translate: "qdsa"},
        {category: 'new',   name: 'Nexus 7',    translate: "dfsafds"}
    ];

function render(PRODUCTS1) {
    React.render(
        //<WordsApp model={model}/>,
        <WordsApp vocabulary={PRODUCTS1} />,
        document.getElementById('WordsApp')
    );
}

//model.subscribe(render);

    $.ajax({
        url: "/api/words",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            render(data);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });






})();
