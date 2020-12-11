const { expectRevert } = require('@openzeppelin/test-helpers');
const ChocoToken = artifacts.require('ChocoToken');

contract('ChocoToken', ([deployer, alice, bob, carol, market, dev, team, partner, other]) => {
    beforeEach(async () => {
        this.choco = await ChocoToken.new(market, dev, team, partner, other, { from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.choco.name();
        const symbol = await this.choco.symbol();
        const decimals = await this.choco.decimals();
        const supply = await this.choco.totalSupply();
        assert.equal(name.valueOf(), 'Choco Swap');
        assert.equal(symbol.valueOf(), 'Choco');
        assert.equal(decimals.valueOf(), '18');
        assert.equal(supply.valueOf(), '21000000000000000000000000')
    });
    it('should transfer token transfers properly', async () => {
        const aliceBal1 = await this.choco.balanceOf(alice);
        assert.equal(aliceBal1.valueOf(), '0');
        await this.choco.transfer(alice, '100', { from: other });
        const aliceBal2 = await this.choco.balanceOf(alice);
        assert.equal(aliceBal2.valueOf(), '100');
    });

    it('should fail if you try to do bad transfers', async () => {
        await expectRevert(
            this.choco.transfer(bob, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        
    });
  });
