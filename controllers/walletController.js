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
  const { farmerId } = req.params;
  let wallets = readWallets();
  const wallet = wallets.find((w) => w.farmerId === farmerId);

  if (!wallet) {
    return res.status(400).json({ status: "400", message: "Farmer ID is required or Wallet not found" });
  }

  return res.status(200).json({ status: "200", message: "Successful", data: { balance: wallet.balance } });
};
