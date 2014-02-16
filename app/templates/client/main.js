var url = 'http://localhost:3000';

// Create simple view model
var vm = new Vue({
    el: '#UserList',

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var xhr = new XMLHttpRequest(),
                self = this;
            xhr.open('GET', url);
            xhr.onload = function() {
                self.users = JSON.parse(xhr.responseText);
            };
            xhr.send();
        }
    }
});
