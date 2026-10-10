/* Browser-local saved work transfer. Provider credentials are deliberately excluded. */
(function (root) {
  const exact = new Set(['pb.v1.state','pb.v1.ui','pb.v1.history','pb_recent_queries','pb_last_search','pb_ai_handoff_v1','pb.wizard.commonCtx.v1','pb.wizard.v1','pb.wizard.previewOpen','pb.wizard.cc.open','pb.wizard.assistLite.v1','reasoning_ladder_v1','fw_dataset','fw_leftW','fw_usecase','fw_audience','fw_style','fw_tone','chatgpt_target','claire:return','pb.ai.suggestions','postLaunchAsk','pb.v1.postLaunch']);
  const allowed = key => exact.has(key) || /^pb\.v1\.xfer\.[a-zA-Z0-9_.-]+$/.test(key) || /^pb\.(?:beta\.hidden|beta\.collapsed|bmc\.hidden)\.v2\./.test(key);
  function collect(storage) {
    const out = {};
    for (let i=0; i<storage.length; i++) { const k=storage.key(i); if (allowed(k)) out[k]=storage.getItem(k); }
    return out;
  }
  function merge(storage, values) {
    const result = {added:0, identical:0, conflicts:[]};
    for (const [key,value] of Object.entries(values || {})) {
      if (!allowed(key) || typeof value !== 'string' || value.length > 5000000) continue;
      const current=storage.getItem(key);
      if (current===null) { storage.setItem(key,value); result.added++; }
      else if(current===value) result.identical++;
      else result.conflicts.push(key);
    }
    return result;
  }
  root.CLARETransfer={allowed,collect,merge};
})(typeof module==='object' ? module.exports : window);
