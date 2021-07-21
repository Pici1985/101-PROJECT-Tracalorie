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
        getItembyId: function(id){
            let found = null;
            // loop through the items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found; 
        },
        updateItem: function(name,calories){
            // calories to number
            calories = parseInt(calories);
            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item; 
                }
            });

            return found;
        },
        deleteItem: function(id){
            // get ids
            const ids = data.items.map(function(item){
                return item.id;
            });

            // get index
            const index = ids.indexOf(id); 

            // remove item 
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];    
        },
        setCurrentItem: function(item){
            data.currentItem = item;    
        },
        getCurrentItem: function(){
            return data.currentItem;    
        },
        getTotalCalories: function(){
            let total = 0;

            //loop through item add cals
            data.items.forEach(function(item){
                total += item.calories;    
            });

            // set total calories in data structure
            data.totalCalories = total;

            //return total
            return data.totalCalories;

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
        listItems: '#item-list li',  
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //turn nodelist into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');   

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em> ${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();    
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';      
            document.querySelector(UISelectors.itemCaloriesInput).value = '';      
        },
        addItemtoForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;      
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;      
            UICtrl.showEditState();   
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn nodelist into array
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            });
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;    
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';    
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';    
            document.querySelector(UISelectors.backBtn).style.display = 'none';    
            document.querySelector(UISelectors.addBtn).style.display = 'inline';   
        }, 
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';    
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';    
            document.querySelector(UISelectors.backBtn).style.display = 'inline';    
            document.querySelector(UISelectors.addBtn).style.display = 'none';    
        }, 
        getSelectors: function(){
            return UISelectors;
        },
        log: function(e){
            console.log('apadfasza');
            e.preventDefault();
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

        // disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.wich === 13){
                e.preventDefault();
                return false;
            }    
        });

        // edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        
        // update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        
        //back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

        //Add item submit
        const itemAddSubmit = function(e){
            // get form input from UI controller 
            const input = UICtrl.getItemInput();

            //check for empty fields
            if(input.name !== '' && input.calories !== ''){
                // Add item 
                const newItem = ItemCtrl.addItem(input.name, input.calories);
                
                // add item to UI list
                UICtrl.addListItem(newItem);

                //get total calories
                const totalCalories = ItemCtrl.getTotalCalories(); 

                //add total calories to UI
                UICtrl.showTotalCalories(totalCalories);

                // clear fields
                UICtrl.clearInput(); 
            }

            e.preventDefault();
        }

        // click edit item
        // itt event delegation hasznalunk de mi a fasznak??
        const itemEditClick = function(e){
            if(e.target.classList.contains('edit-item')){
                // get list item ID 
                const listId = e.target.parentNode.parentNode.id;
                
                //break into an array
                const listIdArr = listId.split('-');

                //get actual id
                const id = parseInt(listIdArr[1]);

                //get item 
                const itemToEdit = ItemCtrl.getItembyId(id);
                
                // set current item
                ItemCtrl.setCurrentItem(itemToEdit);
                
                //add item fo form 
                UICtrl.addItemtoForm();
            }          

            e.preventDefault();
        }

    // update item submit
    const itemUpdateSubmit = function(e){
        // get item input
        const input = UICtrl.getItemInput();

        // update item in datastructure
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //update item in UI
        UICtrl.updateListItem(updatedItem); 

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories(); 

        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    }
    
    //delete button event
    const itemDeleteSubmit = function(e){
        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //delete from datastructure
        ItemCtrl.deleteItem(currentItem.id); 

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

         //get total calories
         const totalCalories = ItemCtrl.getTotalCalories(); 

         //add total calories to UI
         UICtrl.showTotalCalories(totalCalories);
 
         UICtrl.clearEditState();

        e.preventDefault();
    }

    // Clear Items Event
    const clearAllItemsClick = function(){
       // delete atty items from data structure
       ItemCtrl.clearAllItems();  

       //get total calories
       const totalCalories = ItemCtrl.getTotalCalories(); 

       //add total calories to UI
       UICtrl.showTotalCalories(totalCalories);
    
       // remove from UI
       UICtrl.removeItems();

        // hide ul
        UICtrl.hideList();
    }

    // Public methods
    return {
        init: function(){
            console.log('Initializing App...');
            // clear edit state / set initial state
            UICtrl.clearEditState();

            // fetch item from datastructure
            const items = ItemCtrl.getItems();

            // check if any items in list
            if(items.length === 0){     
                UICtrl.hideList();    
            } else {
                //populate list with items
                UICtrl.populateItemList(items);       
            }

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();  // itt is van valami kanya

            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //LoadEvent listeneres
            loadEventListeners();

        }
    }    
    
})(ItemCtrl, UICtrl); 



//Initialize App

App.init();
