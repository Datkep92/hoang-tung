# AGENTS.md

- Đây là workspace tĩnh của `Datkep92/hoang-tung` (nhánh `main`), không có bản mô tả build của Apelin. Không dùng `apelin_project_build`; kiểm tra bằng các test trong `tests/`.
- Node trên máy có symlink hỏng. Chạy test bằng đường dẫn thật và cờ `--jitless`:
  `/private/preboot/3AF6782635474BDFDAC1E400BB78A129DC1925AA852AE1AA4D715D48A47FF72420036E56CBC6BD1507653A2FA27357CA/dopamine-nsEG4w/procursus/usr/local/bin/node.real --jitless tests/<tên-test>.cjs`
- Các test hiện có: `booking-channel.test.cjs` (Zalo/WhatsApp), `booking-telegram.test.cjs` (Telegram), `language-restore.test.cjs` (ngôn ngữ), `booking-datetime.test.cjs` (ngày giờ, báo giá), `dock-responsive.test.cjs` (dãy nút dưới cùng), `place-suggestions.test.cjs` (gợi ý địa danh).
- Form đặt xe nằm ở `index.html`; trang có nhiều dòng rất dài, đọc/ghi theo đoạn thay vì đọc cả tệp.
- Telegram: cấu hình ở dòng đầu `index.html`. Nhóm nhận `Xe Hà Tùng` (`-1005834025079`) đã bật forum topic. Token mới hợp lệ; bot đã được cấp quyền Quản lý chủ đề. Đã thử thật 10 đơn mẫu: tạo 10 chủ đề riêng, gửi đơn kèm IP/vị trí vào từng chủ đề, rồi đóng hết — đều thành công. Không đẩy lên GitHub khi chưa được Sếp yêu cầu. Cập nhật `Documents/Guides/00-status.md` khi thay đổi tiếp.
- Form hiện không có ô đồng ý, không có nút đổi chiều đi. Ô điểm đi/đến nhập tự do, có gợi ý lọc bỏ dấu; ngày/giờ mặc định là hiện tại và nằm cùng dòng trên mobile; câu báo giá dự phòng đã ẩn. Nút gửi Telegram là `Gửi ngay`, đặt trước hai nút Zalo/WhatsApp; dãy nút dưới cùng chia đều và co giãn theo màn hình. Các test mã nguồn đạt; chưa xem trực quan trên màn hình vì Apelin đang chiếm màn hình.
