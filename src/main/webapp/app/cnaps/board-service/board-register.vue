<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.boardBoard.home.createLabel" v-text="$t('gatewayApp.boardBoard.home.createLabel')">Register New Board</h2>
                <div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.boardBoard.title')" for="board-title">Title</label>
                        <input type="text" class="form-control" name="title" id="board-title" placeholder="제목을 입력하세요."
                               :class="{'valid': !$v.board.title.$invalid, 'invalid': $v.board.title.$invalid }"
                               v-model="board.title" required/>
                        <div v-if="$v.board.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.board.title.required">
                                제목은 필수 작성 항목입니다.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.boardBoard.writerName')" for="board-writerName">Writer</label>
                        <input type="text" class="form-control" name="writerName" id="board-writerName"
                               v-model="board.writerName" readonly/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="board-content" v-text="$t('gatewayApp.boardBoard.content')" >Content</label>
                        <textarea class="form-control" name="content" :class="{'valid': !$v.board.content.$invalid, 'invalid': $v.board.content.$invalid }"
                                  id="board-content" placeholder="내용을 입력하세요." rows="10" no-resize="true"
                               v-model="board.content" required/>
                        <div v-if="$v.board.content.$invalid">
                            <small class="form-text text-danger" v-if="!$v.board.content.required">
                                내용은 필수 작성 항목입니다.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.boardBoard.category')" for="board-category">Category</label>
                        <select class="form-control" name="category" :class="{'valid': !$v.board.category.$invalid, 'invalid': $v.board.category.$invalid }" v-model="$v.board.category.$model" id="board-category" >
                            <option value="NORMAL" v-bind:label="$t('gatewayApp.Category.NORMAL')">Normal</option>
                            <option value="NOTICE" v-bind:label="$t('gatewayApp.Category.NOTICE')">Notice</option>
                        </select>
                        <div v-if="$v.board.category.$invalid">
                            <small class="form-text text-danger" v-if="!$v.board.category.required">
                                카테고리는 필수 선택 항목입니다.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.register')">Register</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./board-register.component.ts">
</script>
