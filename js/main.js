document.addEventListener('readystatechange', function (event) {
    if (document.readyState === 'complete') {
        var dropdownLogin = new David.Components.Dropdown(document.getElementById('login'),
            document.getElementById('dropdown-login'));
        document.getElementById('logo').classList.remove('top-yet');

        function activeContent(event) {
            var contentID = event.target.getAttribute('data-target');

            document.querySelector(contentID).classList.toggle('active');
        }

        document.querySelectorAll('.dropdown-nav').forEach(function (dropdownNavs) {
            dropdownNavs.onclick = activeContent;
        });

    } else if (document.readyState === 'interactive') {
        
    }
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var credenciales = David.Utils.formToObject(this);

    console.log(credenciales);
})

var David = {
    Utils: {
        /**
         * Aplica herencia a una clase
         * 
         * @param {Object} derived 
         * @param {Object} base 
         */
        inherit: function (derived, base) {
            derived.prototype = Object.create(base.prototype);
            derived.prototype.constructor = derived;
        },

        formToObject: function(form) {
            if (!(form instanceof HTMLFormElement)) {
                throw 'Parámetro debe ser un formulario';
            }

            var object = {};

            form.querySelectorAll('input').forEach(function (input) {
                object[input.name] = input.value;
            });

            return object;
        }
    },

    Components: {
        /**
         * 
         * @param {HTMLElement} element 
         */
        Component: function (element) {
            this._element = element;
        },

        /**
         * 
         * @param {HTMLElement} trigger 
         * @param {HTMLElement} element 
         */
        Dropdown: function (trigger, element) {
            David.Components.Component.call(this, element);
            this._trigger = trigger;

            var self = this;

            this._trigger.addEventListener('click', function (event) {
                console.log(event);
                self.toggle();
            });
        }
    }
}

David.Utils.inherit(David.Components.Dropdown, David.Components.Component);

David.Components.Dropdown.prototype.toggle = function () {
    var self = this;

    this._element.style.top = this._trigger.clientHeight + this._trigger.offsetTop + 'px';
    this._element.style.left = this._trigger.offsetLeft + 'px';

    if (this._element.classList.contains('hidden')) {
        this._element.classList.remove('hidden');
        this._element.classList.add('active');
    } else {
        this._element.classList.remove('active');
        setTimeout(function () {
            self._element.classList.add('hidden');
        }, 200)
    }
};