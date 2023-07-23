<script>
	import { enhance } from '$app/forms';
    /** @type {import('./$types').ActionData} */
    export let form;
    // TODO: implement file size limit
    // TODO: implement progress bar
</script>

<br>
<h1>caj转换pdf</h1>
<form method="post" use:enhance enctype="multipart/form-data">
    <div class="mb-3">
        <label class="form-label" for="customFile">caj文件</label>
        <input type="file" class="form-control" id="customFile" required/>
    </div>
    <button type="submit" class="btn btn-primary">转换</button>
</form>