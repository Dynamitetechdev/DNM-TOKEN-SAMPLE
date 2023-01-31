//SPDX-license-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

abstract contract Context {
    function msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}
