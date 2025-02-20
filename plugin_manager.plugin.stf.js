// Metadata
const meta_plugin_manager = {
    id: 'ml.crafterpika.pluginmanager69', // ID's should be a unique string
    name: 'PluginManager',
    author: 'CrafterPika',
    version: '0.1',
    link: 'https://github.com/CrafterPika/starfiles-plugins',
    compatibility:{
        website: true
    }
}
// Declare Plugin
window['start_' + meta_plugin_manager.id] = function(){
    if (window.location.href == "https://starfiles.co/settings" || window.location.href == "https://starfiles.ml/settings") {
        // Inject Script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/gh/CrafterPika/starfiles-plugins@latest/_res/plg_mgr_lib.js';
        document.head.appendChild(script);

        // get Plugins Info
        var localstorplugins = localStorage.getItem('plugins');
        var pluginmeta = JSON.parse(localstorplugins);

        /*
            old code not used anymore
            only here for archival propuses
        */
        //var script = `<script>
            // var localstorplugins = localStorage.getItem('plugins');
            // var pluginmeta = JSON.parse(localstorplugins);
            // async function rmPluginID(id) {
                // pluginmeta.splice(id, 1);
                // localStorage.removeItem("plugins");
                // localStorage.setItem('plugins', pluginmeta);
                // alert('Plugin should be uninstalled')
            // }
        //</script>`;
        //var header = document.getElementsByTagName('head')[0];
        // header.innerHTML = script + header.innerHTML;

        var htmltext = `<h4>Installed Plugins</h4>
        <button class="btn btn-small" id="removeAllPlugins">Remove All Plugins</button>
        <div id="installedPluginList"></div>`;
        document.getElementById('advanced').querySelector('h3').insertAdjacentHTML('afterend', htmltext);

        pluginmeta.forEach(function(currentValue, index) {
            var gh_url = "https://github.com/" + currentValue.repo;
            var plugin_nm = currentValue.plugin_name;
            var plugin_ver = currentValue.expected_version;
            var index_nm = index;
            console.log(index_nm)

            var x = document.getElementById('installedPluginList')
            var htmltext =  `<p>Source: <a href="${gh_url}" target="_blank">Github Repo</a> | Name: ${plugin_nm} | Version: ${plugin_ver} | <button class="btn btn-small" onclick="rmPluginID('${plugin_nm}');">Uninstall</button>`
            x.innerHTML = htmltext + x.innerHTML;
        })

        // RM All Plugins
        document.getElementById("removeAllPlugins").addEventListener("click", function(){
            if (confirm('Are you sure to continue, this will disable all plugins you installed')) { 
                // DO IT!
                localStorage.removeItem("plugins");
                alert("Removed all Plugins")
            } else {
                alert('cancelled action')
            }
        });
    } else {
        // Nothing
    }
}
// Run Plugin
init_plugin(meta_plugin_manager);
