document.addEventListener('DOMContentLoaded', function () {

    const bill = document.getElementById('bill');
    const btn = document.getElementById('btn-reset');
    const input_people = document.getElementById('people');
    const percent = document.querySelectorAll('.percent');

    const tip_amount = document.getElementById('tip-amt');
    const tipTotal = document.getElementById('tip-total');
    const custom = document.getElementById('custom');

    custom.addEventListener('change',(e) =>{
        const current_c = e.currentTarget.value = Number(e.currentTarget.value);
        if(isNaN(current_c)){
            e.currentTarget.value = '';
        }
    });

    custom.addEventListener('input', () => {
        const custm = Number(custom.value);
        const billQuantity = bill.value;
        const numbPeople = input_people.value;
        const firstresult = billQuantity / numbPeople;
        const totalOne = firstresult * custm / 100;
        const totalTwo = firstresult + totalOne;
        if (bill.value === '' || bill.value <= 0 || input_people.value === '' || input_people.value <= 0) {
            tip_amount.innerText = '$0.00';
            tipTotal.innerText = '$0.00';
        }
        else {
            tip_amount.innerText = `$${totalOne.toFixed(2)}`;
            tipTotal.innerText = `$${totalTwo.toFixed(2)}`;
        }
    });

    //Function TipAmount-Total Text
    function amount() {
        percent.forEach((per) => {
            per.addEventListener('click', () => {
                const billQuantity = bill.value;
                const numbPeople = input_people.value;
                const firstresult = billQuantity / numbPeople;
                let a = per.firstElementChild.textContent;
                let convert = Number(a.replace('%', '').trim());
                const totalOne = firstresult * convert / 100;
                const totalTwo = firstresult + totalOne;
                if (bill.value === '' || bill.value <= 0 || input_people.value === '' || input_people.value <= 0) {
                    tip_amount.innerText = '$0.00';
                    tipTotal.innerText = '$0.00';
                }
                
                else {
                    tip_amount.innerText = `$${totalOne.toFixed(2)}`;
                    tipTotal.innerText = `$${totalTwo.toFixed(2)}`;
                }
            });
        });


    }

    amount();

    //Select Tip Color
    percent.forEach((per) => {
        per.addEventListener('click', () => {
            if (bill.value === '' || bill.value <= 0 || input_people.value === '' || input_people.value <= 0) {
                return;
            } else {
                for (let i = 0; i < percent.length; i++) {
                    percent[i].classList.remove('bg-[#26c0ab]');
                }
                per.classList.add('bg-[#26c0ab]');
            }
        });
    });

    //Reset Button
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        bill.value = '';
        input_people.value = '';
        e.target.classList.add('opacity-25');
        e.target.disabled = true;
        tip_amount.textContent = '$0.00';
        tipTotal.textContent = '$0.00';
        custom.value = '';
        for (let i = 0; i < percent.length; i++) {
            percent[i].classList.remove('bg-[#26c0ab]');
        }
        return;
    });

    //Bill Input Change
    bill.addEventListener('change', (e) => {
        const current = e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(2);
        if (isNaN(current)) {
            e.target.value = '';
        }
        if (Math.sign(current) === -1) {
            e.target.value = '';
        }
    });

    //Bill Input Validation Result
    bill.addEventListener('input', unLock);
    //Number of people Input Validation Result
    input_people.addEventListener('input', unLockP);
    // Number of people change
    input_people.addEventListener('change', (e) => {
        const current_p = e.currentTarget.value = Number(e.currentTarget.value);
        if (isNaN(current_p)) {
            e.currentTarget.value = '';
        }
        if (Math.sign(current_p) === -1) {
            e.currentTarget.value = '';
        }
    });
    //Validation Bill
    function validation() {
        if (regEx()) {
            return;
        }
        if (bill.value <= 0) {
            removeMessage();
            error();
            message("Can't be zero");
            return;
        }
        removeMessage();
        return true;
    }

    //Regex
    function regEx() {
        const regex = /[^\d+(.\d+){0,1}$]/;
        const result = regex.test(bill.value);
        return result;
    }

    //Text Message
    function message(msg) {
        const labelBill = document.getElementById('label-bill').parentElement;
        const labelMessage = document.createElement('H2');
        labelMessage.textContent = msg;
        labelMessage.classList.add('text-red-500', 'alert');
        labelBill.appendChild(labelMessage);
        return true;
    }

    //UnLock
    function unLock() {
        if (validation()) {
            correct();
            btnResetRemove();
            return;
        }

        if (!validation()) {
            btnResetAdd();
            return;
        }
        return;
    }

    //Button reset remove styles
    function btnResetRemove() {
        if (validation() && people()) {
            btn.classList.remove('opacity-25');
            btn.disabled = false;
            return;
        }
    }
    //Button reset add styles
    function btnResetAdd() {
        if (!people() || !validation()) {
            btn.classList.add('opacity-25');
            btn.disabled = true;
            return;
        }
    }

    //Remove alert message
    function removeMessage() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
        return;
    }

    //Error Message
    function error() {
        bill.classList.remove('border-transparent', 'focus:border-[#26c0ab]');
        bill.classList.add('border-red-500');
        return;
    }
    //Correct Message
    function correct() {
        bill.classList.remove('border-red-500');
        bill.classList.add('border-transparent', 'focus:border-[#26c0ab]');
        return;
    }

    //------------------------------------------------------------------------------------------ 
    //Number of people validation
    function people() {
        if (!regExPeople()) {
            return;
        }

        if (input_people.value <= 0) {
            removeMessageP();
            errorP();
            messageP("Can't be zero");
            return;
        }
        removeMessageP();
        return true;
    }

    //Remove alert message
    function removeMessageP() {
        const alert = document.querySelector('.alert-p');
        if (alert) {
            alert.remove();
        }
        return;
    }

    //Regex peopleInput
    function regExPeople() {
        const regex_p = /^[0-9]*$/g;
        const result_p = regex_p.test(input_people.value);
        return result_p;
    }

    //Text Message
    function messageP(msg) {
        const labelPeople = document.getElementById('people-label').parentElement;
        const labelMessageP = document.createElement('H2');
        labelMessageP.textContent = msg;
        labelMessageP.classList.add('text-red-500', 'alert-p');
        labelPeople.appendChild(labelMessageP);
        return true;
    }

    //Error Message
    function errorP() {
        input_people.classList.remove('border-transparent', 'focus:border-[#26c0ab]');
        input_people.classList.add('border-red-500');
        return;
    }
    //Correct Message
    function correctP() {
        input_people.classList.remove('border-red-500');
        input_people.classList.add('border-transparent', 'focus:border-[#26c0ab]');
        return;
    }

    //Number of people function
    function unLockP() {
        if (people()) {
            correctP();
            btnResetRemove();
            return;
        }

        if (!people()) {
            btnResetAdd();
            return;
        }
    }

});