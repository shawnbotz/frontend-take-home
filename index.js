for (const el of document.querySelectorAll('[data-source][data-target]')) {
  const source = el.getAttribute('data-source')
  const template = document.getElementById(el.getAttribute('data-target'))
  const req = new XMLHttpRequest()

  req.open('GET', source, true)
  req.onreadystatechange = function(e) {
    if (this.readyState === 4 && this.status === 200) {
      const rows = JSON.parse(this.responseText)
      console.warn('rows:', rows)
      for (const row of rows) {
        const tr = document.importNode(template.content, true)
        const data = {
          season: titleCase(row.season),
          duration: row.duration,
          dependsOnStartDate: row.start_date
        }
        for (const item of tr.querySelectorAll('[data-key]')) {
          item.textContent = data[item.getAttribute('data-key')]
        }
        for (const item of tr.querySelectorAll('[data-visible]')) {
          item.hidden = !data[item.getAttribute('data-visible')]
        }
        el.appendChild(tr)
      }
    }
  }
  req.send()
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}
