document.addEventListener('DOMContentLoaded', function() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    const addMemberModal = document.getElementById('addMemberModal');
    const closeModal = document.querySelector('.close');
    const addMemberForm = document.getElementById('addMemberForm');
    const memberTable = document.getElementById('memberTable').getElementsByTagName('tbody')[0];

    // Load member data from JSON file
    let members = [];
    loadMembers();

    // Show modal when 'Add Member' button is clicked
    addMemberBtn.addEventListener('click', function() {
        addMemberModal.style.display = 'block';
    });

    // Close modal when 'x' is clicked
    closeModal.addEventListener('click', function() {
        addMemberModal.style.display = 'none';
    });

    // Add member to table and JSON file
    addMemberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const accNumber = document.getElementById('accNumber').value;
        const mobile = document.getElementById('mobile').value;
        const name = document.getElementById('name').value;
        const ifsc = document.getElementById('ifsc').value;

        // Add member to the table
        const newRow = memberTable.insertRow(-1);
        newRow.innerHTML = `<td>${accNumber}</td><td>${mobile}</td><td>${name}</td><td>${ifsc}</td><td><button class="viewTransaction">View Transactions</button></td>`;
        
        addMemberModal.style.display = 'none';

        // Add member to the JSON data
        const newMember = {
            accNumber: accNumber,
            mobile: mobile,
            name: name,
            ifsc: ifsc
        };
        members.push(newMember);
        saveMembers();

        // Clear form fields
        addMemberForm.reset();
    });

    // Show transactions in popup when 'View Transactions' button is clicked
    memberTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('viewTransaction')) {
            const accNumber = event.target.parentNode.parentNode.cells[0].innerText;
            const member = members.find(member => member.accNumber === accNumber);
            if (member) {
                alert(`Transactions for Account Number ${accNumber}: \nNo transactions available (for demo purposes)`);
            } else {
                alert("Member not found!");
            }
        }
    });

    // Function to load member data from JSON file
    function loadMembers() {
        fetch('members.json')
            .then(response => response.json())
            .then(data => {
                members = data;
                displayMembers();
            })
            .catch(error => console.error('Error loading members:', error));
    }

    // Function to save member data to JSON file
    function saveMembers() {
        fetch('members.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(members)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save members');
            }
        })
        .catch(error => console.error('Error saving members:', error));
    }

    // Function to display members in the table
    function displayMembers() {
        memberTable.innerHTML = '';
        members.forEach(member => {
            const newRow = memberTable.insertRow(-1);
            newRow.innerHTML = `<td>${member.accNumber}</td><td>${member.mobile}</td><td>${member.name}</td><td>${member.ifsc}</td><td><button class="viewTransaction">View Transactions</button></td>`;
        });
    }
});
