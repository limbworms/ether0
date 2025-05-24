// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NftSale {

  uint public totalSales;
  uint public maxSales;

  address public owner;
  address public charity;

  mapping (address => bool) sales;

  constructor() {
    totalSales = 0;
    maxSales = 100;

    owner = msg.sender;
    charity = 0xEa626F9c62cE84271871101ca4802340D8A486Da;
  }

  function canBuy () public view returns (bool) {
    return totalSales < maxSales;
  }

  function hasAccess () public view returns (bool) {
    return sales[msg.sender];
  }

  function buy () public payable returns (bool) {
    require(canBuy() == true, "Buy Failed");
    require(msg.value == 0.01 ether, "Bad amount");
    require(hasAccess() == false, "already owned");

    payable(owner).transfer(msg.value);

    totalSales = totalSales + 1;

    sales[msg.sender] = true;
    
    return true;
  }
}
