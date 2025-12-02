document.addEventListener("DOMContentLoaded", async () => {
    let provider;
    let signer;
    let contract;

    const CONTRACT_ADDRESS = "0xe85f71712aAf6a828f1A683eabf95c473f5E4E0D";
    let ABI;

    // Load ABI from file
    async function loadAbi() {
        try {
            const res = await fetch("./abi.json");
            ABI = await res.json();
        } catch (err) {
            console.error("Failed to load ABI:", err);
        }
    }

    await loadAbi();

    // Connect Wallet
    document.getElementById("connectWallet").onclick = async () => {
        if (window.ethereum) {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();
                const address = await signer.getAddress();
                document.getElementById("walletInfo").innerText = "Connected: " + address;
                contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
                alert("Wallet connected!");
            } catch (err) {
                console.error(err);
                alert("Wallet connection failed!");
            }
        } else {
            alert("Please install MetaMask or Binance Wallet!");
        }
    };

    // Stake tokens
    document.getElementById("stakeBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        const amount = document.getElementById("stakeAmount").value;
        const ref = document.getElementById("referrer").value || "0x0000000000000000000000000000000000000000";

        try {
            const tx = await contract.stakeAndAllocate(ethers.utils.parseUnits(amount, 18), ref);
            await tx.wait();
            alert("Stake successful!");
        } catch (err) {
            console.error(err);
            alert("Error staking!");
        }
    };

    // Claim ROI
    document.getElementById("claimRoiBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        try {
            const tx = await contract.claimRoi();
            await tx.wait();
            alert("ROI claimed!");
        } catch (err) {
            console.error(err);
            alert("Error claiming ROI!");
        }
    };

    // Withdraw
    document.getElementById("withdrawBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        const amount = document.getElementById("withdrawAmount").value;

        try {
            const tx = await contract.withdraw(ethers.utils.parseUnits(amount, 18));
            await tx.wait();
            alert("Withdraw successful!");
        } catch (err) {
            console.error(err);
            alert("Error withdrawing!");
        }
    };

    // Claim Rank Pool (block 1 example)
    document.getElementById("claimRankPoolBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        try {
            const tx = await contract.claimRankPool(1);
            await tx.wait();
            alert("Rank Pool claimed!");
        } catch (err) {
            console.error(err);
            alert("Error claiming Rank Pool!");
        }
    };

    // Claim Highest Staker Pool
    document.getElementById("claimHighestPoolBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        try {
            const tx = await contract.claimHighestStakerPool();
            await tx.wait();
            alert("Highest Pool claimed!");
        } catch (err) {
            console.error(err);
            alert("Error claiming Highest Pool!");
        }
    };

    // Claim High-Tier Pool (tier 0 example)
    document.getElementById("claimHighTierBtn").onclick = async () => {
        if (!contract) return alert("Connect wallet first");
        try {
            const tx = await contract.claimHighStakerPool(0);
            await tx.wait();
            alert("High Tier Pool claimed!");
        } catch (err) {
            console.error(err);
            alert("Error claiming High Tier Pool!");
        }
    };
});
