// WE ARE USING THE MODULE PATTERN

//Storage controller


//Item controller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    
    // Data Structure / State
    const data = {
        items: [
            /* {id: 0, name: 'Steak dinner', calories: 1200 },
            {id: 1, name: 'Cookie', calories: 400 },
            {id: 2, name: 'Eggs', calories: 300 },
            {id: 3, name: 'Szar Rizzsel', calories: 500 },  */
        ],
        currentItem: null,
        totalCalories: 0
    }

    //Public Methods
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            // create ID 
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1; 
            } else {
                ID = 0;
            }
            // parse calories to number
            calories = parseInt(calories);

            //create new item
            newItem = new Item(ID, name, calories);

            // push new item to datastructure array 
            data.items.push(newItem);

            return newItem;
        },
        logData: function(){
            return data;
        }
    }
})(); 


//UI controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    // Public methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em> ${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });
            // Insert List Items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            // show list (unhide)
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // create <li> element
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';
            // add id
            li.id = `item-${item.id}`;
            // add html
            li.innerHTML = `<strong>${item.name}: </strong> <em> ${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // insert item 
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';      
            document.querySelector(UISelectors.itemCaloriesInput).value = '';      
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        }, 
        getSelectors: function(){
            return UISelectors;
        }        
    } 
})(); 



//App controller
const App = (function(ItemCtrl, UICtrl){
    //Load eventlisteners
    const loadEventListeners = function(){
        // getUI selectors
        const UISelectors = UICtrl.getSelectors(); 
        
        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

        //Add item submit
        const itemAddSubmit = function(e){
            // get form input from UI controller 
            const input = UICtrl.getItemInput();

            //check for emty fields
            if(input.name !== '' && input.calories !== ''){
                // Add item 
                const newItem = ItemCtrl.addItem(input.name, input.calories);
                
                // add item to UI list
                UICtrl.addListItem(newItem);

                // clear fields
                UICtrl.clearInput(); 
            }

            e.preventDefault();
        }

    // Public methods
    return {
        init: function(){
            console.log('Initializing App...');

            // fetch item from datastructure
            const items = ItemCtrl.getItems();

            // check if any items in list
            if(items.length === 0){     
                UICtrl.hideList();    
            } else {
                //populate list with items
                UICtrl.populateItemList(items);       
            }

            //LoadEvent listeneres
            loadEventListeners();

        }
    }    
    
})(ItemCtrl, UICtrl); 



//Initialize App

App.init();
