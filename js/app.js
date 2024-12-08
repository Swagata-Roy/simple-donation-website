// Donation data
const donationData = [
    {
        id: 1,
        title: "Donate for Flood at Noakhali, Bangladesh",
        description: "The recent floods in Noakhali have caused significant damage to homes infrastructure. Your donation will help provide essential supplies and to those affected by this disaster. Every contribution, big or small, makes difference. Please join us in supporting the relief efforts and making a positive impact on the lives of those in need.",
        image: "../img/flood1.jpg",
        currentAmount: 0
    },
    {
        id: 2,
        title: "Donate for Flood Relief in Feni,Bangladesh",
        description: "The recent floods in Feni have devastated local communities, leading to severe disruption and loss. Your generous donation will help provide immediate aid, including food, clean water, and medical supplies, to those affected by this calamity. Together, we can offer crucial support and help rebuild lives in the aftermath of this disaster. Every contribution counts towards making a real difference. Please consider donating today to assist those in urgent need.",
        image: "../img/flood2.jpg",
        currentAmount: 500
    },
    {
        id: 3,
        title: "Aid for Injured in the Quota Movement",
        description: "The recent Quota movement has resulted in numerous injuries and significant hardship for many individuals. Your support is crucial in providing medical assistance, rehabilitation, and necessary supplies to those affected. By contributing, you help ensure that injured individuals receive the care and support they need during this challenging time. Every donation plays a vital role in alleviating their suffering and aiding in their recovery. Please consider making a donation to support these brave individuals in their time of need.",
        image: "../img/quota.jpg",
        currentAmount: 2400
    }
];

// DOM Elements
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');
const donationBtn = document.getElementById('donation-btn');
const historyBtn = document.getElementById('history-btn');
const totalBalanceElement = document.getElementById('total-balance');
const successModal = document.getElementById('success-modal');
const historyContainer = document.getElementById('history-container');

// Initial balance
let totalBalance = 100000;

// Common Functions
function formatAmount(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateBalance(amount) {
    totalBalance -= amount;
    totalBalanceElement.textContent = `${formatAmount(totalBalance)} BDT`;
}

// Toggle Sections
donationBtn.addEventListener('click', () => {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    donationBtn.classList.add('active-btn');
    historyBtn.classList.remove('active-btn');
});

historyBtn.addEventListener('click', () => {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    historyBtn.classList.add('active-btn');
    donationBtn.classList.remove('active-btn');
});

// Create Donation Cards
function createDonationCards() {
    donationData.forEach(donation => {
        const card = document.createElement('div');
        card.className = 'card lg:card-side bg-base-100 shadow-xl';
        card.innerHTML = `
            <figure class="lg:w-1/3">
                <img src="${donation.image}" alt="${donation.title}" class="h-full w-full object-cover"/>
            </figure>
            <div class="card-body lg:w-2/3">
                <div class="flex items-center gap-2 mb-2">
                    <img src="img/coin.png" alt="coin" class="h-6">
                    <span class="font-bold">${donation.currentAmount} BDT</span>
                </div>
                <h2 class="card-title">${donation.title}</h2>
                <p>${donation.description}</p>
                <div class="form-control">
                    <input type="number" placeholder="Write Donation Amount" class="input input-bordered w-full" />
                </div>
                <div class="card-actions justify-end">
                    <button class="btn btn-success text-white" onclick="handleDonation(${donation.id}, this)">
                        Donate Now
                    </button>
                </div>
            </div>
        `;
        donationSection.appendChild(card);
    });
}

// Handle Donation
function handleDonation(id, button) {
    const donation = donationData.find(d => d.id === id);
    const input = button.parentElement.previousElementSibling.querySelector('input');
    const amount = parseInt(input.value);

    // Validation
    if (!amount || isNaN(amount)) {
        alert('Please enter a valid donation amount');
        return;
    }

    if (amount > totalBalance) {
        alert('Insufficient balance');
        return;
    }

    // Update balance and donation amount
    updateBalance(amount);
    donation.currentAmount += amount;
    
    // Update display
    const amountDisplay = button.parentElement.parentElement.querySelector('.flex span');
    amountDisplay.textContent = `${donation.currentAmount} BDT`;

    // Add to history
    addToHistory(donation.title, amount);

    // Show success modal
    successModal.showModal();

    // Clear input
    input.value = '';
}

// Add to History
function addToHistory(title, amount) {
    const date = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const historyItem = document.createElement('div');
    historyItem.className = 'bg-base-100 p-4 rounded-lg shadow';
    historyItem.innerHTML = `
        <p class="text-sm text-gray-500">Date: ${date}</p>
        <p class="font-bold">${amount} Taka is Donated for ${title}</p>
    `;
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
}

// Close Modal
function closeModal() {
    successModal.close();
}

// Initialize
createDonationCards();
totalBalanceElement.textContent = `${formatAmount(totalBalance)} BDT`;