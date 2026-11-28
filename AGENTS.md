# AGENTS.md

- Đây là workspace tĩnh của `Datkep92/hoang-tung` (nhánh `main`), không có bản mô tả build của Apelin. Không dùng `apelin_project_build`; kiểm tra bằng các test trong `tests/`.
- Node trên máy có symlink hỏng. Chạy test bằng đường dẫn thật và cờ `--jitless`:
  `/private/preboot/3AF6782635474BDFDAC1E400BB78A129DC1925AA852AE1AA4D715D48A47FF72420036E56CBC6BD1507653A2FA27357CA/dopamine-nsEG4w/procursus/usr/local/bin/node.real --jitless tests/<tên-test>.cjs`
- Các test hiện có: `booking-channel.test.cjs` (Zalo/WhatsApp), `booking-telegram.test.cjs` (Telegram), `language-restore.test.cjs` (ngôn ngữ).
- Form đặt xe nằm ở `index.html`; trang có nhiều dòng rất dài, đọc/ghi theo đoạn thay vì đọc cả tệp.
- Telegram: cấu hình ở dòng đầu `index.html`. Nhóm nhận `Xe Hà Tùng` (`-1005834025079`) đã bật forum topic. Trường `telegramBot` đang để trống vì token Sếp cung cấp bị Telegram trả 401; nhập token mới vào đó trước khi thử gửi thật.
- Không đẩy lên GitHub khi chưa được Sếp yêu cầu. Cập nhật `Documents/Guides/00-status.md` khi thay đổi tiếp.
