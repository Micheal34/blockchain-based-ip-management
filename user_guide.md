# Hướng dẫn sử dụng hệ thống quản lý sở hữu trí tuệ

## Bắt đầu

### Cài đặt và cấu hình

1. Cài đặt Node.js và NPM.
2. Clone hoặc tải xuống mã nguồn từ repository.
3. Cài đặt các dependencies bằng cách chạy `npm install` trong thư mục chính của dự án.

### Sử dụng hệ thống

- Để đăng ký tài sản trí tuệ mới, hãy sử dụng hàm `registerIP` từ `ip_management_contract.js`.
  ```javascript
  const { registerIP } = require('./ip_management_contract');
  registerIP('0xOwnerAddress', 'Chi tiết tài sản trí tuệ')
    .then(transactionHash => {
      console.log('Tài sản trí tuệ đã được đăng ký thành công. Transaction hash:', transactionHash);
    })
    .catch(error => {
      console.error('Lỗi khi đăng ký tài sản trí tuệ:', error);
    });
