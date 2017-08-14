import Layout from '../components/layout'
import React, { Component } from 'react';
import web3, {
  selectContractInstance, mapReponseToJSON
} from '../lib/web3.js';

const DIDABI = {
  "contract_name": "DIDToken",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_email",
          "type": "string"
        },
        {
          "name": "_countryCode",
          "type": "bytes8"
        }
      ],
      "name": "updateProfile",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "contributors",
      "outputs": [
        {
          "name": "DIDBalance",
          "type": "uint256"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "countryCode",
          "type": "bytes8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "DIDBalances",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "emailToAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DIDOutstanding",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_contribAddress",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_contribAddress",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_taskID",
          "type": "string"
        }
      ],
      "name": "issueDIDReward",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "taskID",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "incNumContribs",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_contribAddress",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "burnDIDHAV",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numContribs",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_HAVAddress",
          "type": "address"
        }
      ],
      "name": "setHAVAddress",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_validAddress",
          "type": "address"
        }
      ],
      "name": "approveAddress",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "numDID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "taskID",
          "type": "string"
        }
      ],
      "name": "LogDIDReward",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x606060405234156200000d57fe5b5b5b5b60008054600160a060020a03191633600160a060020a03161790555b620000453364010000000062000b6f6200010e82021704565b5b60028054600160a060020a03191633600160a060020a031617905560408051808201909152600c8082527f44697374656e73652044494400000000000000000000000000000000000000006020909201918252620000a79160039162000156565b506040805180820190915260038082527f44494400000000000000000000000000000000000000000000000000000000006020909201918252620000ee9160049162000156565b50607b6005556101416006556007805460ff191660011790555b62000200565b60005433600160a060020a039081169116146200012b5760006000fd5b600160a060020a0381166000908152600160208190526040909120805460ff191690911790555b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200019957805160ff1916838001178555620001c9565b82800160010185558215620001c9579182015b82811115620001c9578251825591602001919060010190620001ac565b5b50620001d8929150620001dc565b5090565b620001fd91905b80821115620001d85760008155600101620001e3565b5090565b90565b610cb380620002106000396000f300606060405236156100e05763ffffffff60e060020a60003504166306fdde0381146100e25780630915e929146101725780631f6d4942146101d657806320dd38fa14610295578063313ce567146102c357806354817832146102e957806363cc27d01461031857806370a082311461033a5780638da5cb5b14610368578063933f642f1461039457806395d89b411461040b578063b6ef730a1461049b578063ba04fcf31461052b578063d5f719431461053d578063edb7b18c14610570578063f2fde38b14610592578063fa83230c146105b0578063fabf657a146105e0575bfe5b34156100ea57fe5b6100f26105fe565b604080516020808252835181830152835191928392908301918501908083838215610138575b80518252602083111561013857601f199092019160209182019101610118565b505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017a57fe5b6101d4600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050509235600160c060020a031916925061068c915050565b005b34156101de57fe5b6101f2600160a060020a03600435166106f2565b60408051848152600160c060020a0319831691810191909152606060208201818152845460026000196101006001841615020190911604918301829052906080830190859080156102845780601f1061025957610100808354040283529160200191610284565b820191906000526020600020905b81548152906001019060200180831161026757829003601f168201915b505094505050505060405180910390f35b341561029d57fe5b6102b1600160a060020a0360043516610716565b60408051918252519081900360200190f35b34156102cb57fe5b6102d3610728565b6040805160ff9092168252519081900360200190f35b34156102f157fe5b6102fc600435610731565b60408051600160a060020a039092168252519081900360200190f35b341561032057fe5b6102b161074c565b60408051918252519081900360200190f35b341561034257fe5b6102b1600160a060020a0360043516610752565b60408051918252519081900360200190f35b341561037057fe5b6102fc610771565b60408051600160a060020a039092168252519081900360200190f35b341561039c57fe5b604080516020600460443581810135601f81018490048402850184019095528484526103f7948235600160a060020a031694602480359560649492939190920191819084018382808284375094965061078095505050505050565b604080519115158252519081900360200190f35b341561041357fe5b6100f26108c6565b604080516020808252835181830152835191928392908301918501908083838215610138575b80518252602083111561013857601f199092019160209182019101610118565b505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156104a357fe5b6100f2610954565b604080516020808252835181830152835191928392908301918501908083838215610138575b80518252602083111561013857601f199092019160209182019101610118565b505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561053357fe5b6101d46109e2565b005b341561054557fe5b6103f7600160a060020a03600435166024356109ee565b604080519115158252519081900360200190f35b341561057857fe5b6102b1610ad8565b60408051918252519081900360200190f35b341561059a57fe5b6101d4600160a060020a0360043516610ade565b005b34156105b857fe5b6103f7600160a060020a0360043516610b30565b604080519115158252519081900360200190f35b34156105e857fe5b6101d4600160a060020a0360043516610b6f565b005b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106845780601f1061065957610100808354040283529160200191610684565b820191906000526020600020905b81548152906001019060200180831161066757829003601f168201915b505050505081565b600160a060020a0333166000908152600b6020908152604090912083516106bb92600190920191850190610be7565b5033600160a060020a03166000908152600b6020526040902060020180546001604060020a03191660c060020a83041790555b5050565b600b6020526000908152604090208054600282015490916001019060c060020a0283565b600a6020526000908152604090205481565b60075460ff1681565b600c60205260009081526040902054600160a060020a031681565b60055481565b600160a060020a0381166000908152600b60205260409020545b919050565b600254600160a060020a031681565b60095460009033600160a060020a03908116911614806107ae575060025433600160a060020a039081169116145b15156107ba5760006000fd5b6005546107cd908463ffffffff610bb616565b600555600160a060020a0384166000908152600b60205260409020546107f9908463ffffffff610bb616565b600160a060020a0385166000908152600b6020908152604080832093909355600a8152908290208054860190559051835184928291908401908083835b602083106108555780518252601f199092019160209182019101610836565b51815160209384036101000a6000190180199092169116179052604080519290940182900382208983529351939550600160a060020a038a1694507f487dd0c113f7cd07009232d3c9cda3f42a50680770b47a8800e713fc2b62c7d19391829003019150a35060015b5b9392505050565b6004805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106845780601f1061065957610100808354040283529160200191610684565b820191906000526020600020905b81548152906001019060200180831161066757829003601f168201915b505050505081565b6008805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106845780601f1061065957610100808354040283529160200191610684565b820191906000526020600020905b81548152906001019060200180831161066757829003601f168201915b505050505081565b6006805460010190555b565b60095460009033600160a060020a0390811691161480610a1c575060025433600160a060020a039081169116145b1515610a285760006000fd5b600160a060020a0383166000908152600a602052604090205482901015610a4f5760006000fd5b600160a060020a0383166000908152600b6020526040902054821115610a755760006000fd5b600554610a88908363ffffffff610bd016565b600555600160a060020a0383166000908152600b6020526040902054610ab4908363ffffffff610bd016565b600160a060020a0384166000908152600b60205260409020555060015b5b92915050565b60065481565b60005433600160a060020a03908116911614610afa5760006000fd5b600160a060020a0381161515610b105760006000fd5b60008054600160a060020a031916600160a060020a0383161790555b5b50565b6000805433600160a060020a03908116911614610b4d5760006000fd5b60098054600160a060020a031916600160a060020a0384161790555b5b919050565b60005433600160a060020a03908116911614610b8b5760006000fd5b600160a060020a0381166000908152600160208190526040909120805460ff191690911790555b5b50565b600082820183811015610bc557fe5b8091505b5092915050565b600082821115610bdc57fe5b508082035b92915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c2857805160ff1916838001178555610c55565b82800160010185558215610c55579182015b82811115610c55578251825591602001919060010190610c3a565b5b50610c62929150610c66565b5090565b610c8491905b80821115610c625760008155600101610c6c565b5090565b905600a165627a7a72305820337530a9c1679092ce513514bf460d37ad105070e28be784df1182757af3c0cd0029",
  "networks": {
    "3": {
      "events": {
        "0x487dd0c113f7cd07009232d3c9cda3f42a50680770b47a8800e713fc2b62c7d1": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "numDID",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "taskID",
              "type": "string"
            }
          ],
          "name": "LogDIDReward",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x75be4c0d97e04a9b249cb14e414410ff68c7ee6b",
      "updated_at": 1502438108396
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1502438108396
};
const HAVABI = {
  "contract_name": "HAVToken",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "maxEther",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "HAVForSale",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "rate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "recip",
          "type": "address"
        }
      ],
      "name": "buyHAVTokens",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numHAV",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pauseSale",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numberAvailableForSale",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "tradMkt",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "sym",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "etherBal",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tradMkt",
          "type": "bool"
        }
      ],
      "name": "tradMkt",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DIDAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "etherRaised",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "bals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "payable": true,
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "DIDHAV",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogHAVSale",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "saleOn",
          "type": "bool"
        }
      ],
      "name": "LogStatusChange",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x6060604052341561000c57fe5b5b60408051808201909152600c8082527f44697374656e73652048415600000000000000000000000000000000000000006020909201918252610051916001916100eb565b506040805180820190915260038082527f48415600000000000000000000000000000000000000000000000000000000006020909201918252610096916002916100eb565b50600c60035560008054600160a060020a033316600160a060020a031990911617905560058054670de0b6b3a764000002905560c8600955620f11fb600855600a805461ff0019166101001790555b5b61018b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012c57805160ff1916838001178555610159565b82800160010185558215610159579182015b8281111561015957825182559160200191906001019061013e565b5b5061016692915061016a565b5090565b61018891905b808211156101665760008155600101610170565b5090565b90565b6108918061019a6000396000f300606060405236156100ca5763ffffffff60e060020a60003504166306fdde0381146100dc5780630902b25d1461016c5780631266f2ce1461018e5780632c4e722e146101b057806332f35d90146101d2578063433939f7146101e857806355367ba91461020a5780635ce8bed71461022e578063667095731461025057806383813a28146102745780638bc76ec9146103045780638da5cb5b14610326578063c4725f8d14610352578063c906948a1461037b578063cd72ab69146103a7578063fcdcc9fb146103c9575b6100da5b6100d7336103f7565b5b565b005b34156100e457fe5b6100ec6104a8565b604080516020808252835181830152835191928392908301918501908083838215610132575b80518252602083111561013257601f199092019160209182019101610112565b505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017457fe5b61017c610535565b60408051918252519081900360200190f35b341561019657fe5b61017c61053b565b60408051918252519081900360200190f35b34156101b857fe5b61017c610541565b60408051918252519081900360200190f35b6100da600160a060020a03600435166103f7565b005b34156101f057fe5b61017c610547565b60408051918252519081900360200190f35b341561021257fe5b61021a61054d565b604080519115158252519081900360200190f35b341561023657fe5b61017c6105ca565b60408051918252519081900360200190f35b341561025857fe5b61021a6105d5565b604080519115158252519081900360200190f35b341561027c57fe5b6100ec6105de565b604080516020808252835181830152835191928392908301918501908083838215610132575b80518252602083111561013257601f199092019160209182019101610112565b505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561030c57fe5b61017c610669565b60408051918252519081900360200190f35b341561032e57fe5b61033661066f565b60408051600160a060020a039092168252519081900360200190f35b341561035a57fe5b61021a600435151561067e565b604080519115158252519081900360200190f35b341561038357fe5b6103366106af565b60408051600160a060020a039092168252519081900360200190f35b34156103af57fe5b61017c6106be565b60408051918252519081900360200190f35b34156103d157fe5b61017c600160a060020a03600435166106c4565b60408051918252519081900360200190f35b600080600160a060020a03831615156104105760006000fd5b6104186106d6565b15156104245760006000fd5b60095434925061043b90839063ffffffff6106f416565b600854909150610451908363ffffffff61072316565b60085561045e838261073d565b5060408051838152602081018390528151600160a060020a033316927f52f605c670bbd777ec02d5e076ea71e061a212d6960399c9d1b56251ec01759b928290030190a25b505050565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561052d5780601f106105025761010080835404028352916020019161052d565b820191906000526020600020905b81548152906001019060200180831161051057829003601f168201915b505050505081565b60055481565b60075481565b60095481565b60035481565b6000805433600160a060020a0390811691161461056a5760006000fd5b600a805460ff610100808304821615810261ff001990931692909217928390556040805192909304161515815290517f89b1d9a533a53e51465b2d77bfde233eba684ed5a875213a2f4ec6a1afcf4cbb9181900360200190a15060015b90565b600654600554035b90565b600a5460ff1681565b6002805460408051602060018416156101000260001901909316849004601f8101849004840282018401909252818152929183018282801561052d5780601f106105025761010080835404028352916020019161052d565b820191906000526020600020905b81548152906001019060200180831161051057829003601f168201915b505050505081565b60065481565b600054600160a060020a031681565b6000805433600160a060020a0390811691161461069b5760006000fd5b600a805460ff19168315151790555b919050565b600454600160a060020a031681565b60085481565b600b6020526000908152604090205481565b600034158015906106ee5750600a54610100900460ff165b90505b90565b6000828202831580610710575082848281151561070d57fe5b04145b151561071857fe5b8091505b5092915050565b60008282018381101561071857fe5b8091505b5092915050565b600480546040805160006020918201819052825160e060020a63d5f71943028152600160a060020a03888116968201969096526024810187905292519094909316928492849263d5f719439260448084019382900301818787803b15156107a057fe5b6102c65a03f115156107ae57fe5b5050604051519150508015610857576003546107d0908563ffffffff61072316565b600355600160a060020a0385166000908152600b60205260409020546107fc908563ffffffff61072316565b600160a060020a0386166000818152600b6020908152604091829020939093558051878152905191927ff61d4d1fa3cfe9f80b136b68ca92d00dbe7134571a943f36f4f71b804a8afb2392918290030190a26001925061085c565b600092505b5b5050929150505600a165627a7a72305820d0a73f62465b5f530092ee2dff57949366d9aad4257e4a7ae5ed4a4cba4dff010029",
  "networks": {
    "3": {
      "events": {
        "0xf61d4d1fa3cfe9f80b136b68ca92d00dbe7134571a943f36f4f71b804a8afb23": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "DIDHAV",
          "type": "event"
        },
        "0x52f605c670bbd777ec02d5e076ea71e061a212d6960399c9d1b56251ec01759b": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogHAVSale",
          "type": "event"
        },
        "0x89b1d9a533a53e51465b2d77bfde233eba684ed5a875213a2f4ec6a1afcf4cbb": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "saleOn",
              "type": "bool"
            }
          ],
          "name": "LogStatusChange",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x1d39673e3ec391ae7d088dac7a4b7a3d28e6fa32",
      "updated_at": 1502438179288
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1502438179288
};

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numDID: 0,
      numHAV: 0,
      totalTokensOutstanding: 0,
      totalContributors: 0,
      etherRaised: 0,
      numHAV: 0,
      // numCountries: 0,
      account: web3.eth.accounts[0] || null
    };

    this.getStats = this.getStats.bind(this);
  }

  async componentWillMount() {
    this.DIDToken = await selectContractInstance(DIDABI);
    this.HAVToken = await selectContractInstance(HAVABI);
    const stats = await this.getStats();
    console.log(`${stats.numDID}`);
    this.setState({
      numDID: stats.numDID
    });
  }

  async getStats() {
    const numDID = await this.DIDToken.DIDOutstanding.call();
    console.log(`numDID: ${numDID}`);
    const numContribs = await this.DIDToken.numContribs.call();
    console.log(`contribs: ${numContribs}`);
    const numHAV = await this.HAVToken.numHAV.call();
    console.log(`numHAV : ${numHAV}`);
    const etherRaised = await this.HAVToken.etherRaised.call();
    console.log(`etherRaised: ${etherRaised}`);
    const saleOn = await this.HAVToken.saleOn.call();
    console.log(`saleOn: ${saleOn}`);

    return {
      numDID,
      numContribs,
      numHAV,
      etherRaised,
      saleOn
    }
  }


  render() {

    const s = this.state;
    return (
      <Layout title="Stats">
        <div className="stats">
          <h2>Stats <p><small>(testnet)</small></p></h2>
          {s.account && <span className="stat">Welcome: {s.account}</span>}
          {s.numDID && <div className="stat">Number of DID outstanding: {s.numDID}</div>}
          {s.numHAV && <div className="stat">Number of HAV outstanding: {s.numHAV}</div>}
          {s.totalTokensOutstanding && <div className="stat">Distense Tokens Outstanding: {s.totalTokensOutstanding}</div>}
          {s.numContribs && <div className="stat">Number of Contributors: {s.numContribs}</div>}
          {s.etherRaised && <div className="stat">Cumulative Ether Raised: {s.etherRaised}</div>}
          {s.saleOn && <div className="stat">HAV Currently For Sale: {s.HAVSaleActive}</div>}
        </div>
      </Layout>
    );
  }
}
