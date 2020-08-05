<template>
    <div id="footer" class="footer">
<!--        <p v-text="$t('footer')">This is your footer</p>-->
        <br/>
        <br/>
        <p><strong> ©SK(주) C&C. All rights reserved. Powered by Jhipster.</strong></p>
        <br/>
        <br/>
        <p>
            <span v-text="$t('home.explore')">If you explore source code of this project, just visit CNAPS 3.0's github page!</span> <a href="https://github.com/CNAPS-MSA" target="_blank" rel="noopener" v-text="$t('home.github')">GitHub</a>!
        </p>
    </div>
</template>

<script lang="ts" src="./jhi-footer.component.ts">
</script>

<style scoped>
    .footer {
        text-align: left;
    }
</style>
