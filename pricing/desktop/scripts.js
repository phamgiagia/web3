tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#000000', // Black for primary elements like text or headers
                    foreground: '#ffffff', // White for text on black backgrounds
                },
                background: '#ffffff', // White background
                muted: '#d1d5db', // Light gray for subtle accents or muted text
                secondary: {
                    DEFAULT: '#1f2937', // Darker gray for secondary elements
                    light: '#e5e7eb', // Lighter gray for hover states or background accents
                },
            },
        },

    },
}

// ------------------ ------------------ ------------------

// Toggle dropdown visibility
function toggleDropdown() {
    const dropdownMenu = document.querySelector('[data-ow-menu="dropdownMenu"]');
    dropdownMenu.classList.toggle('hidden');
}

// Add click event listener to the element with data-ow-toggle="imupt"
document.querySelector('[data-ow-toggle="imupt"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    toggleDropdown();
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const toggleElement = document.querySelector('[data-ow-toggle="imupt"]');
    const dropdownMenu = document.querySelector('[data-ow-menu="dropdownMenu"]');

    // Check if the click is outside the dropdown and the button
    if (!toggleElement.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});

// ------------------ ------------------ ------------------

// Define search function
function searchDomain() {
    const query = document.querySelector('[data-ow-input="domainInput"]').value.trim();
    if (query) {
        const url = `https://domain.opweb.me?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    } else {
        alert('Please enter a search term.');
    }
}

// Add event listener to button
document.querySelector('[data-ow-button="searchButton"]').addEventListener('click', searchDomain);

// Allow pressing "Enter" to trigger search in the input field
document.querySelector('[data-ow-input="domainInput"]').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchDomain();
    }
});

// ------------------ ------------------ ------------------

// Toggle modal visibility
function toggleModal(which) {
    document.querySelector(`[data-ow-modal="${which}"]`)?.classList.toggle('hidden');
}

// Event listener for modal triggers
document.querySelectorAll('[data-ow-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', function () {
        const modalId = this.getAttribute('data-ow-modal-trigger');
        toggleModal(modalId);
    });
}); 


// 

function setupLocalStorageListeners() {
    // Select all elements with data-ow-plan or data-ow-option attributes
    const elements = document.querySelectorAll('[data-ow-plan], [data-ow-option]');

    // Loop through each element and add a click event listener
    elements.forEach(element => {
        element.addEventListener('click', function() {
            // Check if the element has data-ow-plan and set local storage if it does
            if (element.hasAttribute('data-ow-plan')) {
                const planValue = element.getAttribute('data-ow-plan');
                localStorage.setItem('data-ow-plan', planValue);
                console.log(`Set localStorage: data-ow-plan = ${planValue}`);
            }

            // Check if the element has data-ow-option and set local storage if it does
            if (element.hasAttribute('data-ow-option')) {
                const optionValue = element.getAttribute('data-ow-option');
                localStorage.setItem('data-ow-option', optionValue);
                console.log(`Set localStorage: data-ow-option = ${optionValue}`);
            }
        });
    });
}

// Initialize the listeners
setupLocalStorageListeners();


//   

// Or importing the entire module as an object
import * as MyModule from 'https://opfunc-cdn.vercel.app/o.es.js';

// Now you can call the function
// sendChatNotification();
// Select the button inside the form with data-ow-id="contactForm"
document.querySelector('[data-ow-id="contactForm"] button').addEventListener('click', async function (event) {
    // Prevent any default button behavior (if needed)
    event.preventDefault();

    // Collect input values using data-ow-id
    const data = {};
    const inputs = document.querySelectorAll('[data-ow-id]');
    inputs.forEach(input => {
        data[input.getAttribute('data-ow-id')] = input.value;
    });

    // Call function x with collected data
    await sendChatNotification(data);
    window.location.href = "https://success.opweb.me";
});

// 

// Event listener for mobile menu button
document.querySelector('[data-ow-id="mobileMenuButton"]').addEventListener('click', function () {
    document.querySelector('[data-ow-id="mobileMenu"]').classList.toggle('hidden');
});

// 

// import { plans } from './data/plan';

// function filterArray(dataArray) {
//     // Get values from localStorage
//     const plan = localStorage.getItem('data-ow-plan');
//     const option = localStorage.getItem('data-ow-option');

//     // Convert to numbers if they are not null
//     const planValue = plan !== null ? Number(plan) : null;
//     const optionValue = option !== null ? Number(option) : null;

//     // Filter the array based on the plan and option values
//     return dataArray.filter(item => {
//         return (planValue === null || item['data-ow-plan'] === planValue) &&
//                (optionValue === null || item['data-ow-option'] === optionValue);
//     });
// }

function filterAndFormatArray(dataArray) {
    // Get values from localStorage
    const plan = localStorage.getItem('data-ow-plan');
    const option = localStorage.getItem('data-ow-option');

    // Convert to numbers if they are not null
    const planValue = plan !== null ? Number(plan) : null;
    const optionValue = option !== null ? Number(option) : null;

    // Filter the array based on the plan and option values
    const filteredData = dataArray.filter(item => {
        return (planValue === null || item['data-ow-plan'] === planValue) &&
               (optionValue === null || item['data-ow-option'] === optionValue);
    });

    // Map the filtered results to the desired query string format
    return filteredData.map(item => {
        return `?name=${encodeURIComponent(item.name)}&detail=${encodeURIComponent(item.detail)}&total=${encodeURIComponent(item.totalwdiscount)}`;
    });
}

function addCheckoutListener(link) {
    // Select all elements with the specified data attribute
    const checkoutElements = document.querySelectorAll('[data-ow-action="process-checkout"]');

    // Loop through each element and add a click event listener
    checkoutElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action
            console.log(filterAndFormatArray(plans))
            const paramsData = filterAndFormatArray(plans)[0]
            window.location.href = `${link}/checkout.html${paramsData}`; // Redirect to the specified link
        });
    });
}

// Example usage: redirect to 'https://example.com/checkout'
addCheckoutListener('https://checkout.opweb.me/');
