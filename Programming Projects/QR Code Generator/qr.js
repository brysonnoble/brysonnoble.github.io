// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// switch to change between versions depending on character count
function versionCheck () {
  alert($("#QRString").val().length);
}
