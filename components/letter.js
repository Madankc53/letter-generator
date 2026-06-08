function getDate() {
  const dateVal = document.getElementById('date') ? document.getElementById('date').value : '';
  return dateVal ? new Date(dateVal).toLocaleDateString('ne-NP') : new Date().toLocaleDateString('ne-NP');
}
function showLetter(html) {
  document.getElementById('letterDoc').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('visible');
  showToast('✅ पत्र तयार भयो!', 'success');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('visible');
}
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}
function resetForm() {
  document.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.type === 'date') el.valueAsDate = new Date();
    else if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
}
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('modalOverlay');
  if (overlay && e.target === overlay) closeModal();
});
