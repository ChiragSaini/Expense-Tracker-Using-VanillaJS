const button = document.querySelector("#btnAddExpense");
const totalExpense = document.querySelector('#totalExpense')
const inputDesc = document.querySelector('#inputDesc')
const input = document.querySelector("#inputAmount");
const expenseTable = document.querySelector("#expenseTable");
const delBtn = document.querySelector("#delBtn");

let expense = 0;
let allExpenses = []

function addExpense() {
    const expenseItem = {}

    const amount = parseInt(input.value, 10);
    const desc = inputDesc.value;
    expenseItem["desc"] = desc;
    expenseItem["moment"] = new Date();
    expenseItem["amount"] = amount;
    allExpenses.push(expenseItem);

    expense = expense + amount;
    const someText = `Total: ${expense}`;

    totalExpense.textContent = someText;

    // const allExpenseHTML = allExpenses.map((item) => createListItem(item.desc, item.moment, item.amount));

    // const joinedExepenseHTML = allExpenseHTML.join("");
    // expenseTable.innerHTML = joinedExepenseHTML;
    renderList(allExpenses);
}

button.addEventListener('click', addExpense, false);

function getDateString(moment) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return moment.toLocaleDateString('en-US', options)
}

function newTotal() {
    newExpense = 0;
    for (let i = 0; i < allExpenses.length; i++) {
        newExpense = newExpense + allExpenses[i].amount;
    }
    expense = newExpense;
    const someText = `Total: ${expense}`;
    totalExpense.textContent = someText;
}

function delItem(momentValue) {
    newArr = []
    // console.log(momentValue);
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].moment.valueOf() !== momentValue) {
            newArr.push(allExpenses[i]);
        }
    }
    renderList(newArr);
    allExpenses = newArr;
    newTotal();
}

function renderList(arrOfList) {
    const allExpenseHTML = arrOfList.map((item) => createListItem(item.desc, item.moment, item.amount));
    const joinedExepenseHTML = allExpenseHTML.join("");
    expenseTable.innerHTML = joinedExepenseHTML;
}

function createListItem(desc, moment, amount) {
    return `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            ${desc}
                            <small class="text-muted">${getDateString(moment)}</small>
                        </div>
                        <div>
                            <span class="px-5">
                                ${amount}
                            </span>
                            <button id="delBtn" type="button" onclick="delItem(${moment.valueOf()}) " class="btn btn-outline-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`
}