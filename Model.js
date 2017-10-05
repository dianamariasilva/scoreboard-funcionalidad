class Model {
   constructor() {
      this.todos = [];
      this.inputValue = null;
      this.render = undefined;
   }

   subscribe(render) {
      this.render = render;
   }
   inform() {
      console.log(this.todos.map(e => e.text));
      this.render();
   }
   addTodo(text) {
      this.todos.push({
         id: Utils.uuid(),
         text: text,
         completed: false
      });
      this.inform();
   }
   updateTodo(index, todo) {
      this.todos[index] = todo;
      this.inform();
   }
   removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
      this.inform();
   }
}
