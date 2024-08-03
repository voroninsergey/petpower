// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract PetPower is ERC20, Ownable, ERC20Burnable {
    uint256 private constant MAX_SUPPLY = 8000000 * 10 ** 18;

    constructor(address initialOwner) ERC20("PetPower", "PPWR") Ownable(initialOwner) {
        _mint(initialOwner, MAX_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "ERC20: minting amount exceeds max supply");
        _mint(to, amount);
    }

    function burn(uint256 amount) public override onlyOwner {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public override onlyOwner {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        _approve(account, msg.sender, currentAllowance - amount);
        _burn(account, amount);
    }
}
