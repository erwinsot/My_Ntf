// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftBuySucess is ERC721Enumerable, Ownable {
    string public baseURI;
    mapping(uint256 => string) private _hashIPFS;
    uint256 price;
    mapping (uint256=>bool) private _onSale;
    mapping(uint256=>uint256)private indexs;
    itemSale [] marketpla;
    itemSale item;

    struct itemSale{
        address _owner;
        uint256 tokenId;
        uint256 price;
        
    }

    constructor(string memory _name, string memory _symbol, uint256 _price )
        ERC721(_name, _symbol)
    {
        price=_price;
        baseURI = "https://ipfs.io/ipfs/";
    }
    
    event Sold(address buyer, uint256 amount);

    event Index(uint256 index);

    function  balance() public view returns(uint256){
        return address(this).balance;
    }
    function viewOnSale(address _owner)public view returns(bool[] memory){
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ids=walletOfOwner(_owner);
        bool[] memory sales=new bool[](ownerTokenCount);
        for (uint256 i=0;i<ownerTokenCount;i ++){
            sales[i]=_onSale[ids[i]];
        }
        return sales;
    }
    function indexSell(uint256 tokenId) public view returns(uint256 ){
        return indexs[tokenId];
    }
    function getbalance( ) public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    function getAmount(uint256 _value) public onlyOwner{
        require(address(this).balance>=_value);
        payable(msg.sender).transfer(_value);
    }
    function percentSale(uint256 a) internal pure returns (uint256) {
        return (a * 5)/100;
    }
    function _values(uint256 a, uint256 b) internal pure returns (uint256){
        return a-b;
    }


    function createSell(uint256 tokenIds, uint256 _prices) public {
        require(ERC721.ownerOf(tokenIds)==msg.sender);
        require(!_onSale[tokenIds]);
        item=itemSale(msg.sender,tokenIds,_prices);
        _onSale[tokenIds]=true;
        marketpla.push(item);
        uint256 index=marketpla.length-1;
        indexs[tokenIds]=marketpla.length-1;
        emit Index(index);

    }
    function cancelSale(uint256 index) public returns( bool success){
        require(marketpla[index]._owner==msg.sender);
        require(_onSale[marketpla[index].tokenId]);
        _onSale[marketpla[index].tokenId]=false;
        delete marketpla[index];
        return true;
    }
    function paint() public view returns(itemSale[] memory)
    {
        return marketpla;
    }
    function buyNtf(uint256 idSale)public payable
    {
        require(msg.value==marketpla[idSale].price);
        _transfer(marketpla[idSale]._owner,msg.sender,marketpla[idSale].tokenId);
        _onSale[marketpla[idSale].tokenId]=false;
        uint256 comission=percentSale(marketpla[idSale].price);
        uint256 value=_values(marketpla[idSale].price, comission);
        payable (marketpla[idSale]._owner).transfer(value);
        delete marketpla[idSale];
    }

    function mint(string[] memory _hashes) public payable {
        require(msg.value==price);
        uint256 supply = totalSupply();

        for (uint256 i = 0; i < _hashes.length; i++) {
            _safeMint(msg.sender, supply + i);
            _hashIPFS[supply + i] = _hashes[i];
        }
        emit Sold(msg.sender, price);
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            (bytes(currentBaseURI).length > 0 &&
                bytes(_hashIPFS[tokenId]).length > 0)
                ? string(abi.encodePacked(currentBaseURI, _hashIPFS[tokenId]))
                : "";
    }
    function dataUri(address _owner)public view returns(string[] memory)
    {
        
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ids=walletOfOwner(_owner);
        string[] memory ff= new string[](ownerTokenCount);
        for (uint256 i;i<ownerTokenCount;i++){
            ff[i]=tokenURI(ids[i]);
        }
                return (ff);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}