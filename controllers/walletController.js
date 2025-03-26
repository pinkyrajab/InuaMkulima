const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/wallets.json");

// Helper function to read wallets from JSON
const readWallets = () => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading wallet file:", error);
    return [];
  }
};

exports.getWalletBalance = (req, res) => {
  try {
    const { farmerId } = req.params;

    if (!farmerId) {
        return res.status(400).json({ status: "200", message: "Farmer ID is required" });
    }

    let wallets = readWallets();
    const wallet = wallets.find((w) => w.farmerId === farmerId);

    // I Had to check if wallet was found before proceeding
    if (!wallet) {
        return res.status(200).json({ status: "200", message: "Wallet not found" });
    }

    return res.status(200).json({ status: "000", message: "Wallet balance retrieved", data: { balance: wallet.balance } });

} catch (error) {
    console.error("Wallet Service Error:", error);
    return res.status(400).json({ status: "400", message: "Wallet Service Unavailable" });
}

  
};
